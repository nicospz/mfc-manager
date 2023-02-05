import { createWriteStream, readdirSync, unlink } from 'fs';
import fetch from 'node-fetch';
import { Injectable } from '@nestjs/common';
import { CookiesService } from '@server/src/modules/cookies/cookies.service';
import { FiguresService } from '@server/src/modules/figures/figures.service';
import { startBrowser } from '@server/src/lib/browser';
import { Cookie } from '@server/src/entities/cookie.entity';
import { processDate } from '@server/src/lib/format';
import { Status } from '@server/src/entities/figure.entity';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const csvtojson = require('csvtojson');

@Injectable()
export class RefresherService {
  constructor(
    private readonly figuresService: FiguresService,
    private readonly cookiesService: CookiesService,
  ) {}

  async refreshCookies(): Promise<Cookie[]> {
    await this.cookiesService.clear();
    console.time('Cookies refreshed in: ');
    const SIGNIN_URL = 'https://myfigurecollection.net/session/signin/';

    const browser = await startBrowser();
    if (!browser) return [];
    const page = await browser.newPage();

    await page.goto(SIGNIN_URL);

    // Sign in
    await page.type(
      'input[type=text][name=username]',
      process.env.MFC_USER as string,
    );
    await page.type(
      'input[type=password][name=password]',
      process.env.MFC_PASSWORD as string,
    );
    await page.click('input[type=submit]');
    await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
    const cookies = await page.cookies();
    for (const cookie of cookies) {
      // if (!cookie.name.includes('_g')) {
      if (cookie.name === 'PHPSESSID') {
        await this.cookiesService.create({
          name: cookie.name,
          value: cookie.value,
          domain: cookie.domain,
          path: cookie.path,
          expiresAt: new Date(cookie.expires),
          updatedAt: new Date(),
        });
      }
    }
    console.timeEnd('Cookies refreshed in: ');
    await browser.close();
    return await this.cookiesService.findAll();
  }

  async refreshFigures() {
    console.time('Figures refreshed in: ');
    const COLLECTION_URL = 'https://myfigurecollection.net/manager/collection/';
    const browser = await startBrowser();
    const cookies = await this.cookiesService.findAll();
    const response = await fetch(COLLECTION_URL, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        cookie: cookies
          .map((cookie) => `${cookie.name}=${cookie.value}`)
          .join(';'),
      },
      body: 'commit=exportItemsToCSV&id=1&full_name=1&root=1&categoryid=1&date=1&price=1&scale=1&barcode=1&status=1&num=1&score=1&bdate=1&sdate=1&odate=1&value=1&location=1&method=1&track=1&wishability=1&note=1',
      method: 'POST',
    });
    const fileStream = createWriteStream('./mfc-collection.csv');
    await new Promise((resolve, reject) => {
      response.body?.pipe(fileStream);
      fileStream.on('finish', resolve);
      fileStream.on('error', reject);
    });

    // Converting CSV to JSON
    let jsonArray = [];
    const dir = readdirSync('./');
    const csvFile = dir.find((file) => file.includes('.csv'));
    if (csvFile) {
      // convert csv to json
      const csvFilePath = `./${csvFile}`;
      jsonArray = (await csvtojson().fromFile(csvFilePath)) as any[];
      // remove csv file
      unlink(csvFilePath, (err: any) => {
        if (err) console.error(err);
      });
    }
    console.timeEnd('Figures refreshed in: ');
    await browser.close();

    const figures = jsonArray
      .map((element) => {
        const paymentDate = processDate(element['Payment date']);
        const releaseDate = processDate(element['Release Date']);
        const figure = {
          id: parseInt(element.ID),
          title: element.Title,
          price: parseInt(element.Price),
          status: element.Status as Status,
          shop: element.Shop,
          releaseDate,
          paymentDate,
        };
        return figure;
      })
      // order by release date
      .sort((a, b) => {
        if (!a.releaseDate) return -1;
        if (!b.releaseDate) return 1;
        const aDate = new Date(a.releaseDate);
        const bDate = new Date(b.releaseDate);
        return aDate.getTime() - bDate.getTime();
      });
    await this.figuresService.clear();
    for (const figure of figures) {
      await this.figuresService.create(figure);
    }
    return await this.figuresService.findAll();
  }
}
