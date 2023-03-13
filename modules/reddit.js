import puppeteer from "puppeteer";

import monthToNumber from "../utilities/month-to-number.js";
import wait from "../utilities/wait.js";

import announcement from "../models/announcement.js";

const getItems = async () => {
  // Launch browser
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  console.log("Reddit: Browser launched");

  // Open newsroom
  await page.goto("https://www.redditinc.com/blog");
  await wait(5000);
  console.log("Reddit: Newsroom opened");

  // Define function to extract data from items
  const data = [];
  const extractData = async () => {
    const items = await page.$$("article.article-excerpt");
    for (const item of items) {
      const category = await item
        .$("span.article-topic-link")
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
      const author = await item
        .$("span.author")
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
      const title = await item
        .$("h2.entry-title")
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
        .$("h2.entry-title a")
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
      const dataItem = { category, author, date, title, link };
      data.push(dataItem);
    }
  };

  // Extract data from items
  await extractData();
  let nextPageButton = await page.$("div.nav-links a.next");
  while (nextPageButton) {
    await nextPageButton.evaluate((el) => el.click());
    await wait(5000);
    await extractData();
    nextPageButton = await page
      .$("div.nav-links a.next")
      .then((res) => res || null)
      .catch(() => null);
  }
  console.log("Reddit: Data extracted from items");

  // Close browser
  await browser.close();
  console.log("Reddit: Browser closed");

  // Return data
  return data;
};

const getItemsData = async (items) => {
  // Launch browser
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  console.log("Reddit: Browser launched");

  // Extract item data
  const n = items.length;
  const data = [];
  for (let i = 0; i < n; i++) {
    try {
      console.log(`Reddit: ${i + 1}/${n}`);
      const item = items[i];
      await page.goto(item.link);
      await wait(5000);
      const year = item.date ? +item.date.split(", ")[1] : null;
      const month = item.date ? monthToNumber(item.date.split(" ")[0]) : "";
      const day =
        item.date && item.date.includes("/")
          ? +item.date.split(" ")[1].split(",")[0]
          : null;
      const date = new Date(year, month, day);
      const title = item.title;
      const descriptionElements = await page.$$("div.entry-content p");
      const descriptionElementsLength = descriptionElements.length;
      let descriptionElementsCounter = 0;
      let description = "";
      while (
        descriptionElementsCounter < descriptionElementsLength &&
        !description
      ) {
        const element = descriptionElements[descriptionElementsCounter];
        const text = element
          ? await element
              .evaluate((el) => el.textContent)
              .then((res) => {
                return res && typeof res === "string" && res.length > 100
                  ? res.trim()
                  : "";
              })
              .catch(() => "")
          : "";
        if (text) {
          description = text;
        }
        descriptionElementsCounter++;
      }
      const tags = item.category ? [item.category] : [];
      const author = item.author;
      const url = item.link;
      const newAnnouncement = announcement(
        "Reddit",
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
        throw new Error("Reddit: Invalid data");
      }
    } catch (error) {
      console.log(error);
    }
  }
  console.log("Reddit: Item data extracted");

  // Close browser
  await browser.close();
  console.log("Reddit: Browser closed");

  // Return data
  return data;
};

const getItemsText = async (items) => {
  // Launch browser
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  console.log("Reddit: Browser launched");

  // Extract item data
  const n = items.length;
  const data = [];
  for (let i = 0; i < n; i++) {
    try {
      const item = items[i];
      await page.goto(item.url);
      await wait(2500);
      console.log("Reddit: " + (i + 1) + "/" + n);
      const text = await page
        .$("div.entry-content")
        .then((res) => {
          return res ? res.evaluate((el) => el.textContent) : null;
        })
        .then((res) => {
          return res && typeof res === "string"
            ? res
                .split("\n")
                .map((substring) => substring.trim())
                .filter((substring) => substring)
                .join(" ")
                .split(" ")
                .map((substring) => substring.trim())
                .filter((substring) => substring)
                .join(" ")
            : "";
        })
        .catch((error) => {
          console.log(error);
          return "";
        });
      const dataItem = {
        platform: item.platform,
        url: item.url,
        date: new Date(item.date),
        tags: item.tags,
        title: item.title,
        text,
      };
      data.push(dataItem);
    } catch (error) {
      console.log(error);
    }
  }

  return data;
};

export default { getItems, getItemsData, getItemsText };
