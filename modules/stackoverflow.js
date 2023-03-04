import puppeteer from "../utilities/puppeteer.js";
import wait from "../utilities/wait.js";
import write from "../utilities/write.js";

export default async () => {
  const browser = await puppeteer(false);
  console.log("1. Browser launched");

  const page = await browser.newPage();
  const url = "https://stackoverflow.blog/announcements";
  await page.goto(url);
  console.log("2. Page opened");

  let nextPageButton;
  const items = [];
  const scrapeItems = async () => {
    await wait(3000);
    const liElements = await page.$$("div.grid.ff-row-wrap > div");
    for (const liElement of liElements) {
      const categoryElement = await liElement.$("a.s-tag");
      const categoryText = categoryElement
        ? await categoryElement.evaluate((el) => el.textContent)
        : "";
      const category =
        categoryText && typeof categoryText === "string"
          ? categoryText.toLowerCase().trim()
          : "";
      const dateElement = await liElement.$("span.fc-black-300");
      const dateText = dateElement
        ? await dateElement.evaluate((el) => el.textContent)
        : "";
      const date =
        dateText && typeof dateText === "string" ? dateText.trim() : "";
      const titleElement = await liElement.$("a.fc-black-800");
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
          ? linkText.toLowerCase().trim()
          : "";
      const previewElement = await liElement.$("div.lh-excerpt");
      const previewText = previewElement
        ? await previewElement.evaluate((el) => el.textContent)
        : "";
      const preview =
        previewText && typeof previewText === "string"
          ? previewText.trim()
          : "";
      const item = { category, date, title, link, preview };
      items.push(item);
    }
    nextPageButton = await page.$("div.nav-links a.next");
  };
  await scrapeItems();
  while (nextPageButton) {
    console.log("Loop");
    const nextPageUrl = await nextPageButton.evaluate((el) => {
      return el.getAttribute("href");
    });
    if (nextPageUrl && typeof nextPageUrl === "string") {
      await page.goto(nextPageUrl);
      await scrapeItems();
    }
  }
  console.log("3. Blog elements parsed");

  const fileName = "./output/stackoverflow-" + Date.now() + ".json";
  const fileData = JSON.stringify(items);
  await write(fileName, fileData);
  console.log("4. Scrape process completed");

  await browser.close();
  console.log("5. Browser closed");

  return;
};
