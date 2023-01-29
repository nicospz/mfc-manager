import puppeteer from 'puppeteer';

export const startBrowser = async () => {
  console.log('Opening the browser......');
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--disable-gpu',
      '--disable-dev-shm-usage',
      '--disable-setuid-sandbox',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-sandbox',
      '--no-zygote',
      '--single-process',
    ],
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
  });
  return browser;
};
