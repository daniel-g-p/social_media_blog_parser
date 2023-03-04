import puppeteer from "../utilities/puppeteer.js";
import wait from "../utilities/wait.js";
import write from "../utilities/write.js";

export default async () => {
  const browser = await puppeteer(false);
  console.log("1. Browser launched");

  const page = await browser.newPage();
  await page.goto("https://newsroom.snap.com/news");
  await wait(3000);
  console.log("2. Page opened");

  let loadMoreButton = await page.waitForSelector(
    "button.button.button-regular.button-primary.css-14w0lcv"
  );
  while (loadMoreButton) {
    await loadMoreButton.evaluate((el) => el.click());
    await wait(3000);
    const lastChild = await page.$("a.css-g65o95:last-child");
    const lastChildText = lastChild
      ? await lastChild.evaluate((el) => el.textContent)
      : "";
    if (lastChildText.trim() !== "Million Images") {
      const newLoadMoreButton = await page.$(
        "button.button.button-regular.button-primary.css-14w0lcv"
      );
      loadMoreButton = newLoadMoreButton || null;
    } else {
      loadMoreButton = null;
    }
  }
  console.log("3. Blog elements loaded");

  const items = [];
  const liElements = await page.$$("a.css-g65o95");
  for (const liElement of liElements) {
    const titleText = liElement
      ? await liElement.evaluate((el) => el.textContent)
      : "";
    const title =
      titleText && typeof titleText === "string" ? titleText.trim() : "";
    const linkText = liElement
      ? await liElement.evaluate((el) => el.getAttribute("href"))
      : "";
    const link =
      linkText && typeof linkText === "string"
        ? "https://newsroom.snap.com/" + linkText.toLowerCase().trim()
        : "";
    const item = { title, link };
    items.push(item);
  }
  console.log("4. Blog elements parsed");

  const fileName = "./output/snapchat-" + Date.now() + ".json";
  const fileData = JSON.stringify(items);
  await write(fileName, fileData);
  console.log("5. Scrape process completed");

  await browser.close();
  console.log("6. Browser closed");
};
