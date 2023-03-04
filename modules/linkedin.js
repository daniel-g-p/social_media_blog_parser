import puppeteer from "../utilities/puppeteer.js";
import wait from "../utilities/wait.js";
import write from "../utilities/write.js";

export default async () => {
  const browser = await puppeteer(false);
  console.log("1. Browser launched");

  const page = await browser.newPage();
  await page.goto("https://news.linkedin.com/");
  await wait(3000);
  console.log("2. Page opened");

  let nextPageButton;
  const items = [];
  const scrapeItems = async () => {
    console.log("Scraping items...");
    await wait(3000);
    const liElements = await page.$$("ul.post-list li.post-list-item");
    for (const liElement of liElements) {
      const titleElement = await liElement.$("a.post-headline");
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
          ? "https://news.linkedin.com" + linkText.toLowerCase().trim()
          : "";
      const authorElement = await liElement.$("a.post-entity-3-col");
      const authorText = authorElement
        ? await authorElement.evaluate((el) => el.textContent)
        : "";
      const author =
        authorText && typeof authorText === "string" ? authorText.trim() : "";
      const dateElement = await liElement.$("time.date");
      const dateText = dateElement
        ? await dateElement.evaluate((el) => el.textContent)
        : "";
      const date =
        dateText && typeof dateText === "string" ? dateText.trim() : "";
      const previewElement = await liElement.$("p.post-summary");
      const previewText = previewElement
        ? await previewElement.evaluate((el) => el.textContent)
        : "";
      const preview =
        previewText && typeof previewText === "string"
          ? previewText.trim()
          : "";
      const categoriesElement = await liElement.$("ul.topics");
      const categoriesText = categoriesElement
        ? await categoriesElement.evaluate((el) => el.textContent)
        : "";
      const categories =
        categoriesText && typeof categoriesText === "string"
          ? categoriesText
              .replace("Categories:", "")
              .split("\n")
              .join("")
              .split(",")
              .map((category) => category.toLowerCase().trim())
          : "";
      const item = { title, link, author, date, preview, categories };
      items.push(item);
    }
    nextPageButton = await page.$(
      "a.directional-pagination.next:not(.disabled)"
    );
  };
  await scrapeItems();
  while (nextPageButton) {
    await nextPageButton.evaluate((el) => el.click());
    await scrapeItems();
  }
  console.log("3. Blog elements parsed");

  const fileName = "./output/linkedin-" + Date.now() + ".json";
  const fileData = JSON.stringify(items);
  await write(fileName, fileData);
  console.log("4. Scrape process completed");

  await browser.close();
  console.log("5. Browser closed");

  return;
};
