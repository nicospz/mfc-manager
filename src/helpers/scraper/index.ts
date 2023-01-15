import { ElementHandle } from "puppeteer-core";
import fs from "fs";
import csv from "csvtojson";
import { startBrowser } from "@/helpers/scraper/browser";

export type Figures = any[];

const SIGNIN_URL = "https://myfigurecollection.net/session/signin/";
const COLLECTION_URL = "https://myfigurecollection.net/manager/collection/";

export const scrapeCollection = async () => {
  const browser = await startBrowser();
  if (!browser) return [];
  let page = await browser.newPage();

  console.log(`Navigating to ${SIGNIN_URL}...`);
  await page.goto(SIGNIN_URL);

  // Sign in
  await page.type(
    "input[type=text][name=username]",
    process.env.MFC_USER as string
  );
  await page.type(
    "input[type=password][name=password]",
    process.env.MFC_PASSWORD as string
  );
  await page.click("input[type=submit]");
  await page.waitForNavigation();

  // Go to collection
  console.log(`Navigating to ${COLLECTION_URL}...`);
  await page.goto(COLLECTION_URL);

  // Opening Export CSV Menu
  console.log("Opening Export CSV Menu...");
  const exportCsvButtonList = await page.$x(
    "//a[contains(@class, 'action export')]"
  );
  const exportCsvButton =
    exportCsvButtonList[0] as unknown as ElementHandle<Element>;
  await exportCsvButton.evaluate((b) => (b as HTMLAnchorElement).click());
  await new Promise((r) => setTimeout(r, 1000));

  // Clicking CSV Export
  console.log("Clicking CSV Export...");
  const downloadButtonList = await page.$x("//input[@value='CSV Export']");
  const downloadButton =
    downloadButtonList[0] as unknown as ElementHandle<Element>;
  const client = await page.target().createCDPSession();
  await client.send("Page.setDownloadBehavior", {
    behavior: "allow",
    downloadPath: "/tmp/",
  });
  await downloadButton.evaluate((b) => (b as HTMLAnchorElement).click());
  await new Promise((r) => setTimeout(r, 500));

  // Converting CSV to JSON
  let jsonArray: Figures = [];
  console.log("Converting CSV to JSON...");
  const dir = fs.readdirSync("/tmp/");
  const csvFile = dir.find((file) => file.includes(".csv"));
  if (csvFile) {
    console.log("Found CSV file: ", csvFile);
    // convert csv to json
    const csvFilePath = `/tmp/${csvFile}`;
    jsonArray = await csv().fromFile(csvFilePath);
    //remove csv file
    fs.unlink(csvFilePath, (err) => {
      if (err) console.error(err);
    });
  }

  return jsonArray;
};
