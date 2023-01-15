import puppeteer, { Browser } from "puppeteer-core";
import chromium from "chrome-aws-lambda";

export const startBrowser = async () => {
  let browser: Browser;
  try {
    console.log("Opening the browser......");
    browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    });
    return browser;
  } catch (err) {
    console.log("Could not create a browser instance => : ", err);
    return undefined;
  }
};
