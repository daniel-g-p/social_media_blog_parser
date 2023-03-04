import puppeteer from "../utilities/puppeteer.js";
import wait from "../utilities/wait.js";
import write from "../utilities/write.js";

export default async () => {
  const browser = await puppeteer(false);
  console.log("1. Browser launched");

  const page = await browser.newPage();
  await page.goto("https://blog.youtube/news-and-events");
  console.log("2. Page opened");

  let loadMoreButton = await page.waitForSelector(
    "button.yt-latest-articles__load-more"
  );
  while (loadMoreButton) {
    await loadMoreButton.evaluate((el) => el.click());
    await wait(3000);
    const lastChild = await page.$("li.yt-latest-articles__item:last-child");
    const lastChildTimeElement = lastChild
      ? await lastChild.$("time.yt-latest-articles__date")
      : null;
    const lastChildTimeText = lastChildTimeElement
      ? await lastChildTimeElement.evaluate((el) => el.textContent)
      : "";
    const lastChildTime =
      lastChildTimeText && typeof lastChildTimeText === "string"
        ? lastChildTimeText.trim()
        : "";
    console.log(lastChildTime);
    if (lastChildTime !== "Jul.07.2005") {
      const newLoadMoreButton = await page.waitForSelector(
        "button.yt-latest-articles__load-more"
      );
      loadMoreButton = newLoadMoreButton || null;
    } else {
      loadMoreButton = null;
    }
  }
  console.log("3. Blog elements loaded");

  const items = [];
  const liElements = await page.$$("li.yt-latest-articles__item");
  for (const liElement of liElements) {
    const categoryElement = await liElement.$("p.yt-latest-articles__category");
    const categoryText = categoryElement
      ? await categoryElement.evaluate((el) => el.textContent)
      : "";
    const category =
      categoryText && typeof categoryText === "string"
        ? categoryText.toLowerCase().trim()
        : "";
    const titleElement = await liElement.$("h3.yt-latest-articles__title");
    const titleText = titleElement
      ? await titleElement.evaluate((el) => el.textContent)
      : "";
    const title =
      titleText && typeof titleText === "string" ? titleText.trim() : "";
    const dateElement = await liElement.$("time.yt-latest-articles__date");
    const dateText = dateElement
      ? await dateElement.evaluate((el) => el.textContent)
      : "";
    const date =
      dateText && typeof dateText === "string" ? dateText.trim() : "";
    const linkElement = await liElement.$("a.yt-latest-articles__link");
    const linkText = linkElement
      ? await linkElement.evaluate((el) => el.getAttribute("href"))
      : "";
    const link =
      linkText && typeof linkText === "string"
        ? linkText.toLowerCase().trim()
        : "";
    const item = { category, title, date, link };
    items.push(item);
  }
  console.log("4. Blog elements parsed");

  const fileName = "./output/youtube-" + Date.now() + ".json";
  const fileData = JSON.stringify(items);
  await write(fileName, fileData);
  console.log("5. Scrape process completed");

  await browser.close();
  console.log("7. Browser closed");

  return;
};
