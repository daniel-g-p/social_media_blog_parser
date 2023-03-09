import puppeteer from "puppeteer";

import monthToNumber from "../utilities/month-to-number.js";
import wait from "../utilities/wait.js";

import announcement from "../models/announcement.js";

const getItems = async () => {
  // Launch browser
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  console.log("Facebook: Browser launched");

  // Open newsroom
  await page.goto("https://about.fb.com/news");
  await wait(5000);
  console.log("Facebook: Newsroom opened");

  // Filter items by category "Facebook"
  const facebookCategoryInput = await page.$("#cat_filter_12");
  await facebookCategoryInput.evaluate((el) => el.click());
  await wait(5000);
  console.log("Facebook: Items filtered by 'Facebook' category");

  // Load entire item history
  const container = await page.$("#posts");
  let loadMoreButton = await page.$("#show_more");
  while (container && loadMoreButton) {
    await loadMoreButton.evaluate((el) => el.click());
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
    console.log("Facebook: Item history loaded until " + lastItemTime);
    loadMoreButton =
      lastItemTime !== "May 3, 2006"
        ? await page
            .$("#show_more")
            .then((res) => res || null)
            .catch(() => null)
        : null;
  }
  console.log("Facebook: Item history loaded");

  // Extract data from items
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
  console.log("Facebook: Data extracted from items");

  // Close browser
  await browser.close();
  console.log("Facebook: Browser closed");

  // Return data
  return data;
};

const getItemsData = async (items) => {
  // Launch browser
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  console.log("Facebook: Browser launched");

  // Extract item data
  const n = items.length;
  const data = [];
  for (let i = 0; i < n; i++) {
    try {
      console.log(`Facebook: ${i + 1}/${n}`);
      const item = items[i];
      await page.goto(item.link);
      await wait(5000);
      const year = item.time ? +item.time.split(", ")[1] : null;
      const month = item.time ? monthToNumber(item.time.split(" ")[0]) : "";
      const day = item.time ? +item.time.split(" ")[1].split(",")[0] : null;
      const date = new Date(year, month, day);
      const title = item.title;
      const description = item.preview;
      const tagElements = await page.$$("div.entry-categories a");
      const tags = [];
      for (const tagElement of tagElements) {
        const tag = tagElement
          ? await tagElement
              .evaluate((el) => el.textContent)
              .then((res) => {
                return res && typeof res === "string" ? res.trim() : "";
              })
              .catch(() => {
                console.log(error);
                return "";
              })
          : "";
        if (tag) {
          tags.push(tag);
        }
      }
      const author = await page
        .$("div.post-custom_author")
        .then((res) => {
          return res ? res.evaluate((el) => el.textContent) : "";
        })
        .then((res) => {
          return res && typeof res === "string"
            ? res.slice(0, 3) === "By "
              ? res.slice(3).trim()
              : res.trim()
            : "";
        })
        .catch((error) => {
          console.log(error);
          return "";
        });
      const url = item.link;
      const newAnnouncement = announcement(
        "Facebook",
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
        throw new Error("Facebook: Invalid data");
      }
    } catch (error) {
      console.log(error);
    }
  }
  console.log("Facebook: Item data extracted");

  // Close browser
  await browser.close();
  console.log("Facebook: Browser closed");

  // Return data
  return data;
};

export default { getItems, getItemsData };
