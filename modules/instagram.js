import puppeteer from "../utilities/puppeteer.js";
import wait from "../utilities/wait.js";
import write from "../utilities/write.js";

export default async () => {
  const browser = await puppeteer(false);
  console.log("1. Browser launched");

  const page = await browser.newPage();
  const url = "https://about.instagram.com/blog";
  await page.goto(url);
  console.log("2. Page opened");

  const acceptCookieButton = await page.waitForSelector(
    "button._42ft._4jy0._a6hb._a6ha._4jy3._4jy1.selected._51sy"
  );
  await acceptCookieButton.evaluate((el) => el.click());
  console.log("3. Cookies accepted");

  let loadMoreButton = await page.waitForSelector("button._afnw");
  await loadMoreButton.evaluate((el) => el.click());
  while (loadMoreButton) {
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
  const liElements = await page.$$("li._agif._ajte");
  console.log("4. News elements loaded");

  const items = [];
  for (const liElement of liElements) {
    const hashtagElements = await liElement.$$("a._8hyj._9gii");
    const hashtags = [];
    for (const hashtagElement of hashtagElements) {
      const hashtagText = await hashtagElement.evaluate((el) => {
        return el.textContent;
      });
      const hashtag =
        hashtagText && typeof hashtagText === "string"
          ? hashtagText.toLowerCase().replace("#", "").trim()
          : "";
      if (hashtag) {
        hashtags.push(hashtag);
      }
    }
    const titleElement = await liElement.$("div._agih a._9gii");
    const titleText = await titleElement.evaluate((el) => {
      return el.textContent;
    });
    const title =
      titleText && typeof titleText === "string" ? titleText.trim() : "";
    const linkText = await titleElement.evaluate((el) => {
      return el.getAttribute("href");
    });
    const link =
      linkText && typeof linkText === "string"
        ? "https://about.instagram.com" + linkText
        : "";
    const item = { title, link, hashtags };
    items.push(item);
  }
  console.log("5. News elements parsed");

  const fileName = "./output/instagram-" + Date.now() + ".json";
  const fileData = JSON.stringify(items);
  await write(fileName, fileData);
  console.log("6. Scrape process completed");

  await browser.close();
  console.log("7. Browser closed");

  return;
};
