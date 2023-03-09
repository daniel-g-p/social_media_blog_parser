import puppeteer from "puppeteer";
import wait from "../utilities/wait.js";
import write from "../utilities/write.js";

const getItems = async () => {
  // Launch browser
  const browser = await puppeteer.launch({ headless: false });
  console.log("Browser launched");

  // Open Facebook newsroom
  const page = await browser.newPage();
  await page.goto("https://about.fb.com/news");
  await wait(5000);
  console.log("Facebook newsroom opened");

  // Filter items by category "Facebook"
  const facebookCategoryInput = await page.$("#cat_filter_12");
  await facebookCategoryInput.evaluate((el) => el.click());
  await wait(5000);
  console.log("Items filtered by 'Facebook' category");

  // Load entire item history
  const container = await page.$("#posts");
  let loadMoreButton = await page.waitForSelector("#show_more");
  while (container && loadMoreButton) {
    await wait(5000);
    const lastItemTime = await page
      .$("#posts")
      .then((res) => {
        return res ? res.$("article.article-preview:last-child") : null;
      })
      .then((res) => {
        return res ? res.$("time.entry-date") : null;
      })
      .then((res) => {
        return res ? res.evaluate((el) => el.textContent) : "";
      })
      .then((res) => {
        return res && typeof res === "string" ? res.trim() : "";
      })
      .catch((error) => {
        console.log(error);
        return "";
      });
    console.log(lastItemTime);
    if (lastItemTime !== "May 3, 2006") {
      const newLoadMoreButton = await page.waitForSelector("#show_more");
      if (newLoadMoreButton) {
        loadMoreButton = newLoadMoreButton;
        await loadMoreButton.evaluate((el) => el.click());
      } else {
        loadMoreButton = null;
      }
    } else {
      loadMoreButton = null;
    }
    console.log("Item history loaded until " + lastItemTime);
  }
  console.log("Item history loaded");

  // Extract data from each item
  const data = [];
  const items = await container.$$("article.article-preview");
  for (const item of items) {
    const category = await item
      .$("span.cat-link")
      .then((res) => {
        return res ? res.evaluate((el) => el.textContent) : "";
      })
      .then((res) => {
        return res && typeof res === "string" ? res.trim() : "";
      })
      .catch((error) => {
        console.log(error);
        return "";
      });
    const title = await item
      .$("h3.entry-title a")
      .then((res) => {
        return res ? res.evaluate((el) => el.textContent) : "";
      })
      .then((res) => {
        return res && typeof res === "string" ? res.trim() : "";
      })
      .catch((error) => {
        console.log(error);
        return "";
      });
    const link = await item
      .$("h3.entry-title a")
      .then((res) => {
        return res ? res.evaluate((el) => el.getAttribute("href")) : "";
      })
      .then((res) => {
        return res && typeof res === "string" ? res.trim() : "";
      })
      .catch((error) => {
        console.log(error);
        return "";
      });
    const preview = await item
      .$("div.article-excerpt-body")
      .then((res) => {
        return res ? res.evaluate((el) => el.textContent) : "";
      })
      .then((res) => {
        return res && typeof res === "string" ? res.trim() : "";
      })
      .catch((error) => {
        console.log(error);
        return "";
      });
    const time = await item
      .$("time.entry-date")
      .then((res) => {
        return res ? res.evaluate((el) => el.textContent) : "";
      })
      .then((res) => {
        return res && typeof res === "string" ? res.trim() : "";
      })
      .catch((error) => {
        console.log(error);
        return "";
      });
    const dataItem = { category, title, link, preview, time };
    data.push(dataItem);
  }
  console.log("Data extracted from items");

  // Close browser
  await browser.close();
  console.log("Browser closed");

  // Return data
  return data;

  // const fileName = "./output/facebook-" + Date.now() + ".json";
  // const fileData = JSON.stringify(items);
  // await write(fileName, fileData);
  // console.log("6. Scrape process completed");

  // await browser.close();
  // console.log("7. Browser closed");
};

export default { getItems };
