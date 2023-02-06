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

  async fetchCollection() {
    const COLLECTION_URL = 'https://myfigurecollection.net/manager/collection/';
    const cookies = await this.cookiesService.findAll();
    const response = await fetch(COLLECTION_URL, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        cookie: cookies
          .map((cookie) => `${cookie.name}=${cookie.value}`)
          .join(';'),
        credentials: 'includes',
      },
      body: 'commit=exportItemsToCSV&id=1&full_name=1&root=1&categoryid=1&date=1&price=1&scale=1&barcode=1&status=1&num=1&score=1&bdate=1&sdate=1&odate=1&value=1&location=1&method=1&track=1&wishability=1&note=1',
      method: 'POST',
    });
    return response;
  }

  async refreshFigures() {
    console.time('Figures refreshed in: ');

    try {
      let response = await this.fetchCollection();
      const contentType = response.headers.get('content-type');

      if (contentType && !contentType.includes('text/plain')) {
        console.error('Invalid content type. Authentication failed.');
        console.log('Refreshing cookies and trying again...');
        await this.refreshCookies();
        response = await this.fetchCollection();

        if (contentType && !contentType.includes('text/plain')) {
          throw Error('Invalid content type. Authentication failed.');
        }
      }

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
      if (figures.length > 0) {
        await this.figuresService.clear();
        for (const figure of figures) {
          await this.figuresService.create(figure);
        }
      }
    } catch (e) {
      console.error(e);
    }
    console.timeEnd('Figures refreshed in: ');
    return await this.figuresService.findAll();
  }
}
