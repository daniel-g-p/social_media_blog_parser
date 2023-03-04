import puppeteer from "../utilities/puppeteer.js";
import wait from "../utilities/wait.js";
import write from "../utilities/write.js";

export default async () => {
  const browser = await puppeteer(false);
  console.log("1. Browser launched");

  const page = await browser.newPage();
  await page.goto("https://www.redditinc.com/blog");
  await wait(3000);
  console.log("2. Page opened");

  let nextPageButton;
  const items = [];
  const scrapeItems = async () => {
    await wait(3000);
    const liElements = await page.$$("article.article-excerpt");
    for (const liElement of liElements) {
      const categoryElement = await liElement.$("span.article-topic-link");
      const categoryText = categoryElement
        ? await categoryElement.evaluate((el) => el.textContent)
        : "";
      const category =
        categoryText && typeof categoryText === "string"
          ? categoryText.toLowerCase().trim()
          : "";
      const authorElement = await liElement.$("span.author");
      const authorText = authorElement
        ? await authorElement.evaluate((el) => el.textContent)
        : "";
      const author =
        authorText && typeof authorText === "string" ? authorText.trim() : "";
      const dateElement = await liElement.$("time.entry-date");
      const dateText = dateElement
        ? await dateElement.evaluate((el) => el.textContent)
        : "";
      const date =
        dateText && typeof dateText === "string" ? dateText.trim() : "";
      const titleElement = await liElement.$("h2.entry-title");
      const titleText = titleElement
        ? await titleElement.evaluate((el) => el.textContent)
        : "";
      const title =
        titleText && typeof titleText === "string" ? titleText.trim() : "";
      const linkElement = titleElement ? await titleElement.$("a") : "";
      const linkText = linkElement
        ? await linkElement.evaluate((el) => el.getAttribute("href"))
        : "";
      const link =
        linkText && typeof linkText === "string"
          ? "https://newsroom.pinterest.com" + linkText.toLowerCase().trim()
          : "";
      const item = { category, author, date, title, link };
      items.push(item);
    }
    nextPageButton = await page.$("div.nav-links a.next");
  };
  await scrapeItems();
  while (nextPageButton) {
    await nextPageButton.evaluate((el) => el.click());
    await scrapeItems();
  }
  console.log("3. Blog elements parsed");

  const fileName = "./output/reddit-" + Date.now() + ".json";
  const fileData = JSON.stringify(items);
  await write(fileName, fileData);
  console.log("5. Scrape process completed");

  await browser.close();
  console.log("6. Browser closed");
};
