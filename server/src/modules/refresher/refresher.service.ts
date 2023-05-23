import { createWriteStream, readdirSync, unlink } from 'fs';
import fetch from 'node-fetch';
import { load } from 'cheerio';
import setCookie from 'set-cookie-parser';
import { v2 as cloudinary } from 'cloudinary';
import { Injectable } from '@nestjs/common';
import { CookiesService } from '@server/src/modules/cookies/cookies.service';
import { FiguresService } from '@server/src/modules/figures/figures.service';
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

    const response = await fetch(SIGNIN_URL, {
      headers: {
        accept: 'application/json, text/javascript, */*; q=0.01',
        'accept-language': 'en-US,en;q=0.9,ja;q=0.8,es;q=0.7',
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'sec-ch-ua':
          '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'x-requested-with': 'XMLHttpRequest',
      },
      body: `commit=signIn&from=https%3A%2F%2Fmyfigurecollection.net%2F&username=${
        process.env.MFC_USER as string
      }&password=${process.env.MFC_PASSWORD as string}&remember=1`,
      method: 'POST',
    });
    const setCookieHeader = response.headers.get('Set-Cookie');

    let cookies: setCookie.Cookie[] = [];
    if (setCookieHeader) {
      cookies = setCookie.parse(setCookieHeader, {
        decodeValues: true, // default: true
      });
    }

    for (const cookie of cookies) {
      // if (!cookie.name.includes('_g')) {
      if (cookie.name === 'PHPSESSID') {
        await this.cookiesService.create({
          name: cookie.name,
          value: cookie.value,
          domain: cookie.domain ?? '',
          path: cookie.path ?? '',
          expiresAt: new Date(cookie.expires ?? ''),
          updatedAt: new Date(),
        });
      }
    }
    console.timeEnd('Cookies refreshed in: ');
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
      let contentType = response.headers.get('content-type');

      if (contentType && !contentType.includes('text/plain')) {
        console.error('Invalid content type. Authentication failed.');
        console.log('Refreshing cookies and trying again...');
        await this.refreshCookies();
        response = await this.fetchCollection();
        contentType = response.headers.get('content-type');

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
        jsonArray = await csvtojson().fromFile(csvFilePath);
        // remove csv file
        unlink(csvFilePath, (err: NodeJS.ErrnoException | null) => {
          if (err) console.error(err);
        });
      }

      const figures = jsonArray
        .map((element: Record<string, string>) => {
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
            score: element.Score === '' ? 0 : parseInt(element.Score),
            wishability:
              element.Wishability === '' ? 0 : parseInt(element.Wishability),
          };
          return figure;
        })
        // order by release date
        .sort((a: { releaseDate?: string }, b: { releaseDate?: string }) => {
          if (!a.releaseDate) return -1;
          if (!b.releaseDate) return 1;
          const aDate = new Date(a.releaseDate);
          const bDate = new Date(b.releaseDate);
          return aDate.getTime() - bDate.getTime();
        });
      for (const figure of figures) {

        await this.figuresService.createOrUpdate({
          id: figure.id,
          title: figure.title,
          price: figure.price,
          status: figure.status,
          shop: figure.shop,
          releaseDate: figure.releaseDate,
          paymentDate: figure.paymentDate,
          score: figure.score,
          wishability: figure.wishability,
        });
      }
    } catch (e) {
      console.error(e);
    }
    console.timeEnd('Figures refreshed in: ');
    return await this.figuresService.findAll();
  }

  async refreshImages() {
    console.time('Images refreshed in: ');
    const figures = await this.figuresService.findAll();
    const length = figures.length;
    let i = 0;
    for (const figure of figures) {
      if (figure.imageUrl) {
        console.log(`${i++}/${length} - ${figure.title} already has an image`);
        continue;
      };
      console.time(`${figure.title} image refreshed in: `);
      const response = await fetch(
        `https://myfigurecollection.net/item/${figure.id}`,
      );
      const html = await response.text();
      const $ = load(html);
      const src = $('img.thumbnail').attr('src');
      if (src) {
        cloudinary.config({
          cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
          api_key: process.env.CLOUDINARY_API_KEY as string,
          api_secret: process.env.CLOUDINARY_API_SECRET as string,
        });
        const result = await cloudinary.uploader.upload(src, {
          folder: process.env.NODE_ENV === 'production' ? 'mfc/thumbnails' : 'mfc/dev/thumbnails',
        }); 
        console.log(result.secure_url);

        await this.figuresService.update(figure.id, { imageUrl: result.secure_url });
        console.timeEnd(`${figure.title} image refreshed in: `);
      }
      i++;
      console.log(`${i}/${length}`);
    }
    console.timeEnd('Images refreshed in: ');
    return await this.figuresService.findAll();
  }

  async refreshAllImages() {
    console.time('All images refreshed in: ');
    const figures = await this.figuresService.findAll();
    const length = figures.length;
    let i = 0;
    for (const figure of figures) {
      console.time(`${figure.title} image refreshed in: `);
      const response = await fetch(
        `https://myfigurecollection.net/item/${figure.id}`,
      );
      const html = await response.text();
      const $ = load(html);
      const src = $('img.thumbnail').attr('src');
      if (src) {
        cloudinary.config({
          cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
          api_key: process.env.CLOUDINARY_API_KEY as string,
          api_secret: process.env.CLOUDINARY_API_SECRET as string,
        });
        const result = await cloudinary.uploader.upload(src, {
          folder: process.env.NODE_ENV === 'development' ? 'mfc/dev/thumbnails' : 'mfc/thumbnails',
        }); 
        console.log(result.secure_url);

        await this.figuresService.update(figure.id, { imageUrl: result.secure_url });
        console.timeEnd(`${figure.title} image refreshed in: `);
      }
      i++;
      console.log(`${i}/${length}`);
    }
    console.timeEnd('All images refreshed in: ');
    return await this.figuresService.findAll();
  }
}
