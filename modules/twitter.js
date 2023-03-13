import puppeteer from "puppeteer";

import monthToNumber from "../utilities/month-to-number.js";
import wait from "../utilities/wait.js";

import announcement from "../models/announcement.js";

const getItems = async () => {
  // Launch browser
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  console.log("Twitter: Browser launched");

  // Open newsroom
  await page.goto("https://blog.twitter.com");
  await wait(5000);
  console.log("Twitter: Newsroom opened");

  // Load entire item history
  let loadMoreButton = await page.$("div.results-loop a.load-more");
  while (loadMoreButton) {
    await loadMoreButton.evaluate((el) => el.click());
    await wait(5000);
    loadMoreButton = await page
      .$("div.results-loop a.load-more")
      .then((res) => res || null)
      .catch(() => null);
  }
  console.log("Twitter: Item history loaded");

  // Extract data from items
  const data = [];
  const items = await page.$$("div.results-loop__result");
  for (const item of items) {
    const category = await item
      .$("span.result__topic")
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
      .$("a.result__title")
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
      .$("a.result__title")
      .then((res) => {
        return res ? res.evaluate((el) => el.getAttribute("href")) : "";
      })
      .then((res) => {
        return res && typeof res === "string"
          ? "https://blog.twitter.com" + res.trim()
          : "";
      })
      .catch((error) => {
        console.log(error);
        return "";
      });
    const author = await item
      .$("div.blog__author-content")
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
    const date = await item
      .$("time")
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
    if (link) {
      const dataItem = { category, title, link, author, date };
      data.push(dataItem);
    }
  }
  console.log("Twitter: Data extracted from items");

  // Close browser
  await browser.close();
  console.log("Twitter: Browser closed");

  // Return data
  return data;
};

const getItemsData = async (items) => {
  // Launch browser
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  console.log("Twitter: Browser launched");

  // Extract item data
  const n = items.length;
  const data = [];
  for (let i = 0; i < n; i++) {
    try {
      console.log(`Twitter: ${i + 1}/${n}`);
      const item = items[i];
      await page.goto(item.link);
      await wait(5000);
      const year = item.date ? +item.date.split(" ")[3] : null;
      const month = item.date ? monthToNumber(item.date.split(" ")[2]) : "";
      const day = item.date ? +item.date.split(" ")[1] : null;
      const date = new Date(year, month, day);
      const title = item.title;
      const description = await page
        .$('head meta[property="og:description"]')
        .then((res) => {
          return res ? res.evaluate((el) => el.getAttribute("content")) : "";
        })
        .then((res) => {
          return res && typeof res === "string" ? res.trim() : "";
        })
        .catch(() => "");
      const tagElements = await page.$$("div.post__tags li");
      const tags = [];
      for (const tagElement of tagElements) {
        const tag = await tagElement
          .evaluate((el) => el.textContent)
          .then((res) => {
            return res && typeof res === "string" ? res.trim() : "";
          })
          .catch(() => {
            console.log(error);
            return "";
          });
        if (tag) {
          tags.push(tag);
        }
      }
      if (item.category && !tags.includes(item.category.toLowerCase())) {
        tags.push(item.category);
      }
      const author = "";
      const url = item.link;
      const newAnnouncement = announcement(
        "Twitter",
        date,
        title,
        description,
        tags,
        author,
        url
      );
      if (newAnnouncement) {
        data.push(newAnnouncement);
      } else {
        throw new Error("Twitter: Invalid data");
      }
    } catch (error) {
      console.log(error);
    }
  }
  console.log("Twitter: Item data extracted");

  // Close browser
  await browser.close();
  console.log("Twitter: Browser closed");

  // Return data
  return data;
};

export default { getItems, getItemsData };
