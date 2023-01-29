import { createWriteStream, readdirSync, unlink } from 'fs';
import { startBrowser } from 'src/scraper/browser';
import fetch from 'node-fetch';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const csvtojson = require('csvtojson');

const SIGNIN_URL = 'https://myfigurecollection.net/session/signin/';
const COLLECTION_URL = 'https://myfigurecollection.net/manager/collection/';

export type Figure = {
  id: number;
  title: string;
  price: number;
  status: string;
  shop: string;
  releaseDate: Date;
  paymentDate: Date;
};

export const scrapeCollection = async (): Promise<Figure[]> => {
  console.time('Scraped collection in');
  const browser = await startBrowser();
  if (!browser) return [];
  const page = await browser.newPage();

  console.log(`Navigating to ${SIGNIN_URL}...`);
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
  console.log('Signing in...');
  await page.click('input[type=submit]');
  await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
  const cookies = await page.cookies();

  console.log('Exporting collection...');
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
  console.log('Converting CSV to JSON...');
  const dir = readdirSync('./');
  const csvFile = dir.find((file) => file.includes('.csv'));
  if (csvFile) {
    console.log('Found CSV file: ', csvFile);
    // convert csv to json
    const csvFilePath = `./${csvFile}`;
    jsonArray = await csvtojson().fromFile(csvFilePath);
    // remove csv file
    unlink(csvFilePath, (err) => {
      if (err) console.error(err);
    });
  }
  console.timeEnd('Scraped collection in');
  console.log('Closing browser...');
  await browser.close();

  return (
    jsonArray
      .map((element) => {
        const figure = {
          id: parseInt(element.ID),
          title: element.Title,
          price: parseInt(element.Price),
          status: element.Status,
          shop: element.Shop,
          // replace 00 for 28 to avoid date-fns error
          releaseDate: new Date(element['Release Date'].replace('00', '28')),
          paymentDate: new Date(element['Payment date'].replace('00', '28')),
        };
        return figure;
      })
      // order by release date
      .sort((a, b) => {
        const aDate = new Date(a.releaseDate);
        const bDate = new Date(b.releaseDate);
        return aDate.getTime() - bDate.getTime();
      })
  );
};
