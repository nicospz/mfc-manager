import puppeteer, { Browser } from "puppeteer-core";
import chrome from "chrome-aws-lambda";

export const startBrowser = async () => {
  let browser: Browser;
  try {
    console.log("Opening the browser......");
    browser = await puppeteer.launch({
      args: chrome.args,
      executablePath: await chrome.executablePath,
      headless: chrome.headless,
    });
    return browser;
  } catch (err) {
    console.log("Could not create a browser instance => : ", err);
    return undefined;
  }
};
