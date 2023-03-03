import puppeteer from "puppeteer";

export default async (headless) => {
  const options = { headless: headless === true };
  const browser = await puppeteer.launch(options);
  const page = await browser.newPage();
  return page;
};
