import puppeteer from "../utilities/puppeteer.js";
import wait from "../utilities/wait.js";
import write from "../utilities/write.js";

export default async () => {
  const page = await puppeteer(true);
  const url = "https://about.instagram.com/blog/announcements/Instagram";

  page.goto(url);

  const acceptCookieButton = await page.waitForSelector(
    "button._42ft._4jy0._a6hb._a6ha._4jy3._4jy1.selected._51sy"
  );
  await acceptCookieButton.evaluate((el) => el.click());

  let loadMoreButton = await page.waitForSelector("button._afnw");
  await loadMoreButton.evaluate((el) => el.click());

  while (loadMoreButton) {
    wait(30000);
    loadMoreButton = await page.waitForSelector("button._afnw");
    await loadMoreButton.evaluate((el) => el.click());
  }

  const liElements = await page.$$("li._agif._ajte");

  const items = [];

  for (const liElement of liElements) {
    const hashtagElements = await liElement.$$("a._8hyj._9gii");
    const hashtags = [];
    for (const element of hashtagElements) {
      const hashtag = await element.evaluate((el) => {
        const text = el.innerText;
        return text && typeof text === "string"
          ? text.toLowerCase().replace("#")
          : "";
      });
      if (hashtag) {
        hashtags.push(hashtag);
      }
    }
    const titleElement = await liElement.$("a._9gii");
    const link = await titleElement.evaluate((el) => {
      const href = el.getAttribute("href");
      return href && typeof href === "string"
        ? "https://about.instagram.com" + href
        : "";
    });
    const title = await titleElement.evaluate((el) => {
      const text = el.innerText;
      return text && typeof text === "string" ? text.trim() : "";
    });
    const item = { title, link, hashtags };
    items.push(item);
  }

  const fileName = "instagram-" + Date.now() + ".json";
  const fileData = JSON.stringify(items);
  await write(fileName, fileData);
};
