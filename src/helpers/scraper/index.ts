import { ElementHandle } from 'puppeteer-core';
import csv from 'csvtojson';
import fs from 'fs';
import { startBrowser } from '@/helpers/scraper/browser';
import { FigureType } from '@/pages/api/scraper';

export type Figures = FigureType[];

const SIGNIN_URL = 'https://myfigurecollection.net/session/signin/';
const COLLECTION_URL = 'https://myfigurecollection.net/manager/collection/';

export const scrapeCollection = async () => {
  let startTime = Date.now();
  const browser = await startBrowser();
  if (!browser) return [];
  const page = await browser.newPage();
  console.log('Browser opened in', Date.now() - startTime, 'ms');

  startTime = Date.now();
  console.log(`Navigating to ${SIGNIN_URL}...`);
  await page.goto(SIGNIN_URL);
  console.log('Page loaded in', Date.now() - startTime, 'ms');

  // Sign in
  await page.type(
    'input[type=text][name=username]',
    process.env.MFC_USER as string
  );
  await page.type(
    'input[type=password][name=password]',
    process.env.MFC_PASSWORD as string
  );
  console.log('Signing in...');
  startTime = Date.now();
  await page.click('input[type=submit]');
  await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
  console.log('Signed in in', Date.now() - startTime, 'ms');

  // Go to collection
  console.log(`Navigating to ${COLLECTION_URL}...`);
  startTime = Date.now();
  await page.goto(COLLECTION_URL);
  console.log('Page loaded in', Date.now() - startTime, 'ms');

  // Opening Export CSV Menu
  console.log('Opening Export CSV Menu...');
  startTime = Date.now();
  const exportCsvButtonList = await page.$x(
    "//a[contains(@class, 'action export')]"
  );
  const exportCsvButton =
    exportCsvButtonList[0] as unknown as ElementHandle<Element>;
  await exportCsvButton.evaluate((b) => { (b as HTMLAnchorElement).click(); });
  await new Promise((r) => setTimeout(r, 750));
  console.log('Export CSV Menu opened in', Date.now() - startTime, 'ms');

  // Clicking CSV Export
  console.log('Clicking CSV Export...');
  startTime = Date.now();
  const downloadButtonList = await page.$x("//input[@value='CSV Export']");
  const downloadButton =
    downloadButtonList[0] as unknown as ElementHandle<Element>;
  const client = await page.target().createCDPSession();
  await client.send('Page.setDownloadBehavior', {
    behavior: 'allow',
    downloadPath: '/tmp/'
  });
  await downloadButton.evaluate((b) => { (b as HTMLAnchorElement).click(); });
  await new Promise((r) => setTimeout(r, 500));
  console.log('File downloaded in', Date.now() - startTime, 'ms');

  // Converting CSV to JSON
  let jsonArray = [];
  console.log('Converting CSV to JSON...');
  startTime = Date.now();
  const dir = fs.readdirSync('/tmp/');
  const csvFile = dir.find((file) => file.includes('.csv'));
  if (csvFile) {
    console.log('Found CSV file: ', csvFile);
    // convert csv to json
    const csvFilePath = `/tmp/${csvFile}`;
    jsonArray = await csv().fromFile(csvFilePath);
    // remove csv file
    fs.unlink(csvFilePath, (err) => {
      if (err) console.error(err);
    });
  }
  console.log('CSV converted to JSON in', Date.now() - startTime, 'ms');

  return (
    jsonArray
      .map(
        (element) => {
          const figure: FigureType = {
            id: element.ID,
            title: element.Title,
            // replace 00 for 28 to avoid date-fns error
            releaseDate: element['Release Date'].replace('00', '28'),
            shop: element.Shop,
            price: parseInt(element.Price),
            paymentDate: element['Payment Date'],
            status: element.Status
          };
          return figure;
        }
      )
      // order by release date
      .sort((a, b) => {
        const aDate = new Date(a.releaseDate);
        const bDate = new Date(b.releaseDate);
        return aDate.getTime() - bDate.getTime();
      })
  );
};
