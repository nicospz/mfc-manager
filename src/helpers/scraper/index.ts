import csv from "csvtojson";
import fetch from "node-fetch";
import fs from "fs";
import { startBrowser } from "@/helpers/scraper/browser";
import { FigureType } from "@/pages/api/scraper";

export type Figures = FigureType[];

const SIGNIN_URL = "https://myfigurecollection.net/session/signin/";
const COLLECTION_URL = "https://myfigurecollection.net/manager/collection/";

export const scrapeCollection = async () => {
  const browser = await startBrowser();
  if (!browser) return [];
  const page = await browser.newPage();

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
  console.log("Signing in...");
  await page.click("input[type=submit]");
  await page.waitForNavigation({ waitUntil: "domcontentloaded" });
  const cookies = await page.cookies();

  console.log("Exporting collection...");
  const response = await fetch(COLLECTION_URL, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      cookie: cookies
        .map((cookie) => `${cookie.name}=${cookie.value}`)
        .join(";"),
    },
    body: "commit=exportItemsToCSV&id=1&full_name=1&root=1&categoryid=1&date=1&price=1&scale=1&barcode=1&status=1&num=1&score=1&bdate=1&sdate=1&odate=1&value=1&location=1&method=1&track=1&wishability=1&note=1",
    method: "POST",
  });
  const fileStream = fs.createWriteStream("/tmp/mfc-collection.csv");
  await new Promise((resolve, reject) => {
    response.body.pipe(fileStream);
    fileStream.on("finish", resolve);
    fileStream.on("error", reject);
  });

  // Converting CSV to JSON
  let jsonArray = [];
  console.log("Converting CSV to JSON...");
  const dir = fs.readdirSync("/tmp/");
  const csvFile = dir.find((file) => file.includes(".csv"));
  if (csvFile) {
    console.log("Found CSV file: ", csvFile);
    // convert csv to json
    const csvFilePath = `/tmp/${csvFile}`;
    jsonArray = await csv().fromFile(csvFilePath);
    // remove csv file
    fs.unlink(csvFilePath, (err) => {
      if (err) console.error(err);
    });
  }

  return (
    jsonArray
      .map((element) => {
        const figure: FigureType = {
          id: element.ID,
          title: element.Title,
          // replace 00 for 28 to avoid date-fns error
          releaseDate: element["Release Date"].replace("00", "28"),
          shop: element.Shop,
          price: parseInt(element.Price),
          paymentDate: element["Payment Date"],
          status: element.Status,
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
