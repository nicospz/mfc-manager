import puppeteer, { Browser } from "puppeteer";

export const startBrowser = async () => {
  let browser: Browser;
  try {
    console.log("Opening the browser......");
    browser = await puppeteer.launch({
      headless: true,
      args: ["--disable-setuid-sandbox'"],
      ignoreHTTPSErrors: true,
    });
    return browser;
  } catch (err) {
    console.log("Could not create a browser instance => : ", err);
    return undefined;
  }
};
