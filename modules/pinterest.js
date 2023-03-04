import puppeteer from "../utilities/puppeteer.js";
import wait from "../utilities/wait.js";
import write from "../utilities/write.js";

export default async () => {
  const browser = await puppeteer(false);
  console.log("1. Browser launched");

  const page = await browser.newPage();
  await page.goto("https://newsroom.pinterest.com/en");
  await wait(3000);
  console.log("2. Page opened");

  let nextPageButton;
  const items = [];
  const scrapeItems = async () => {
    await wait(3000);
    const liElements = await page.$$("div.success-stories figure.image-tile");
    for (const liElement of liElements) {
      const dateElement = await liElement.$("time");
      const dateText = dateElement
        ? await dateElement.evaluate((el) => el.textContent)
        : "";
      const date =
        dateText && typeof dateText === "string" ? dateText.trim() : "";
      const titleElement = await liElement.$("a.link--more");
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
          ? "https://newsroom.pinterest.com" + linkText.toLowerCase().trim()
          : "";
      const item = { date, title, link };
      items.push(item);
    }
    nextPageButton = await page.$(
      "li.pagination__item--next a:not(.pagination__item--disabled)"
    );
  };
  await scrapeItems();
  while (nextPageButton) {
    await nextPageButton.evaluate((el) => el.click());
    await scrapeItems();
  }
  console.log("3. Blog elements parsed");

  const fileName = "./output/pinterest-" + Date.now() + ".json";
  const fileData = JSON.stringify(items);
  await write(fileName, fileData);
  console.log("4. Scrape process completed");

  await browser.close();
  console.log("5. Browser closed");

  return;
};
