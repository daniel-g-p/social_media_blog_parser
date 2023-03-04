import puppeteer from "../utilities/puppeteer.js";
import wait from "../utilities/wait.js";
import write from "../utilities/write.js";

export default async () => {
  const browser = await puppeteer(false);
  console.log("1. Browser launched");

  const page = await browser.newPage();
  await page.goto("https://blog.youtube/news-and-events");
  console.log("2. Page opened");

  let loadMoreButton = await page.waitForSelector("button._afnw");
  while (loadMoreButton) {
    await loadMoreButton.evaluate((el) => el.click());
    await wait(3000);
    await page
      .waitForSelector("button._afnw")
      .then((res) => {
        loadMoreButton = res || null;
        return loadMoreButton.evaluate((el) => el.click());
      })
      .then(() => {
        return true;
      })
      .catch(() => {
        loadMoreButton = null;
        return false;
      });
  }
};
