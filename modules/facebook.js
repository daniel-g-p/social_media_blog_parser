import puppeteer from "../utilities/puppeteer.js";
import wait from "../utilities/wait.js";
import write from "../utilities/write.js";

export default async () => {
  const browser = await puppeteer(false);
  console.log("1. Browser launched");

  const page = await browser.newPage();
  const url = "https://about.fb.com/news";
  await page.goto(url);
  console.log("2. Page opened");

  const facebookCategoryInput = await page.waitForSelector("#cat_filter_12");
  await facebookCategoryInput.evaluate((el) => {
    return el.parentElement.click();
  });
  await wait(3000);
  console.log("3. News elements filtered by 'Facebook' category");

  const containerElement = await page.$("div.archive-articles-container");
  let loadMoreButton = await page.waitForSelector("#show_more");
  await loadMoreButton.evaluate((el) => el.click());
  while (loadMoreButton) {
    await wait(3000);
    const lastChild = await containerElement.$(
      "article.article-preview:last-child"
    );
    const lastChildTimeElement = lastChild
      ? await lastChild.$("time.entry-date")
      : null;
    const lastChildTimeText = lastChildTimeElement
      ? await lastChildTimeElement.evaluate((el) => el.textContent)
      : "";
    const lastChildTime =
      lastChildTimeText && typeof lastChildTimeText === "string"
        ? lastChildTimeText.trim()
        : "";
    if (lastChildTime !== "May 3, 2006") {
      const newLoadMoreButton = await page.waitForSelector("#show_more");
      if (newLoadMoreButton) {
        loadMoreButton = newLoadMoreButton;
        loadMoreButton.evaluate((el) => el.click());
      } else {
        loadMoreButton = null;
      }
    } else {
      loadMoreButton = null;
    }
    console.log("   More news elements loaded (" + lastChildTime + ")");
  }
  const liElements = await containerElement.$$("article.article-preview");
  console.log("4. News elements loaded");

  const items = [];
  for (const liElement of liElements) {
    const categoryElement = await liElement.$("span.cat-link");
    const categoryText = categoryElement
      ? await categoryElement.evaluate((el) => {
          return el.textContent;
        })
      : "";
    const category =
      categoryText && typeof categoryText === "string"
        ? categoryText.toLowerCase().trim()
        : "";
    const titleElement = await liElement.$("h3.entry-title a");
    const titleText = titleElement
      ? await titleElement.evaluate((el) => {
          return el.textContent;
        })
      : "";
    const title =
      titleText && typeof titleText === "string" ? titleText.trim() : "";
    const linkText = await titleElement.evaluate((el) => {
      return el.getAttribute("href");
    });
    const link = linkText && typeof linkText === "string" ? linkText : "";
    const previewElement = await liElement.$("div.article-excerpt-body");
    const previewText = previewElement
      ? await previewElement.evaluate((el) => {
          return el.textContent;
        })
      : "";
    const preview =
      previewText && typeof previewText === "string" ? previewText.trim() : "";
    const timeElement = await liElement.$("time.entry-date");
    const timeText = timeElement
      ? await timeElement.evaluate((el) => el.textContent)
      : "";
    const time =
      timeText && typeof timeText === "string" ? timeText.trim() : "";

    const item = { title, preview, time, link, category };
    items.push(item);
  }
  console.log("5. News elements parsed");

  const fileName = "./output/facebook-" + Date.now() + ".json";
  const fileData = JSON.stringify(items);
  await write(fileName, fileData);
  console.log("6. Scrape process completed");

  await browser.close();
  console.log("7. Browser closed");

  return;
};
