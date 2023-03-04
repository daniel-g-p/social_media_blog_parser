import puppeteer from "../utilities/puppeteer.js";
import wait from "../utilities/wait.js";
import write from "../utilities/write.js";

export default async () => {
  const browser = await puppeteer(false);
  console.log("1. Browser launched");

  const page = await browser.newPage();
  await page.goto("https://blog.twitter.com/");
  await wait(3000);
  console.log("2. Page opened");

  let loadMoreButton = await page.waitForSelector(
    "div.results-loop a.load-more"
  );
  while (loadMoreButton) {
    await loadMoreButton.evaluate((el) => el.click());
    await wait(3000);
    const newLoadMoreButton = await page.$("div.results-loop a.load-more");
    loadMoreButton = newLoadMoreButton || null;
  }
  console.log("3. Blog elements loaded");

  const items = [];
  const liElements = await page.$$("div.results-loop__result");
  for (const liElement of liElements) {
    const categoryElement = await liElement.$("span.result__topic");
    const categoryText = categoryElement
      ? await categoryElement.evaluate((el) => el.textContent)
      : "";
    const category =
      categoryText && typeof categoryText === "string"
        ? categoryText.toLowerCase().trim()
        : "";
    const titleElement = await liElement.$("a.result__title");
    const titleText = titleElement
      ? await titleElement.evaluate((el) => el.textContent)
      : "";
    const title =
      titleText && typeof titleText === "string" ? titleText.trim() : "";
    const linkText = titleElement
      ? await titleElement.evaluate((el) => el.getAttribute("href"))
      : "";
    const link =
      linkText && typeof linkText === "string"
        ? "https://blog.twitter.com" + linkText.toLowerCase().trim()
        : "";
    const authorElement = await liElement.$("div.blog__author-content");
    const authorText = authorElement
      ? await authorElement.evaluate((el) => el.textContent)
      : "";
    const author =
      authorText && typeof authorText === "string" ? authorText.trim() : "";
    const dateElement = await liElement.$("time");
    const dateText = dateElement
      ? await dateElement.evaluate((el) => el.textContent)
      : "";
    const date =
      dateText && typeof dateText === "string" ? dateText.trim() : "";
    const item = { category, title, link, author, date };
    items.push(item);
  }
  console.log("4. Blog elements parsed");

  const fileName = "./output/twitter-" + Date.now() + ".json";
  const fileData = JSON.stringify(items);
  await write(fileName, fileData);
  console.log("5. Scrape process completed");

  await browser.close();
  console.log("6. Browser closed");
};
