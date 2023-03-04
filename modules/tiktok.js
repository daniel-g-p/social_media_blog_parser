import puppeteer from "../utilities/puppeteer.js";
import read from "../utilities/read.js";
import wait from "../utilities/wait.js";
import write from "../utilities/write.js";

export default async () => {
  const browser = await puppeteer(false);
  console.log("1. Browser launched");

  const page = await browser.newPage();
  const htmlData = await read("./html/tiktok.html");
  const htmlString = await htmlData.toString();
  await page.setContent(htmlString, { waitUntil: "domcontentloaded" });
  await wait(3000);
  console.log("2. Page opened");

  const items = [];
  const liElements = await page.$$(
    "div.newsroom-list-wrapper article.newsroom-item-card"
  );
  for (const liElement of liElements) {
    const categoryElement = await liElement.$("h3.header-tag a.tag");
    const categoryText = categoryElement
      ? await categoryElement.evaluate((el) => el.textContent)
      : "";
    const category =
      categoryText && typeof categoryText === "string"
        ? categoryText.toLowerCase().trim()
        : "";
    const dateElement = await liElement.$("h3.header-tag span.date");
    const dateText = dateElement
      ? await dateElement.evaluate((el) => el.textContent)
      : "";
    const date =
      dateText && typeof dateText === "string" ? dateText.trim() : "";
    const titleElement = await liElement.$("h2");
    const titleText = titleElement
      ? await titleElement.evaluate((el) => el.textContent)
      : "";
    const title =
      titleText && typeof titleText === "string" ? titleText.trim() : "";
    const linkText = await titleElement.evaluate((el) =>
      el.parentElement.getAttribute("href")
    );
    const link =
      linkText && typeof linkText === "string"
        ? linkText.toLowerCase().trim()
        : "";
    const previewElement = await liElement.$("p.desc");
    const previewText = previewElement
      ? await previewElement.evaluate((el) => el.textContent)
      : "";
    const preview =
      previewText && typeof previewText === "string" ? previewText.trim() : "";
    const item = { category, date, title, link, preview };
    items.push(item);
  }
  console.log("3. Blog elements parsed");

  const fileName = "./output/tiktok-" + Date.now() + ".json";
  const fileData = JSON.stringify(items);
  await write(fileName, fileData);
  console.log("4. Scrape process completed");

  await browser.close();
  console.log("5. Browser closed");
};
