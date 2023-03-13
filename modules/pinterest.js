import puppeteer from "puppeteer";

import monthToNumber from "../utilities/month-to-number.js";
import wait from "../utilities/wait.js";

import announcement from "../models/announcement.js";

const getItems = async () => {
  // Launch browser
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  console.log("Pinterest: Browser launched");

  // Open newsroom
  await page.goto("https://newsroom.pinterest.com/en");
  await wait(5000);
  console.log("Pinterest: Newsroom opened");

  // Define function to extract data from items
  const data = [];
  const extractData = async () => {
    const items = await page.$$("div.success-stories figure.image-tile");
    for (const item of items) {
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
      const title = await item
        .$("a.link--more")
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
        .$("a.link--more")
        .then((res) => {
          return res ? res.evaluate((el) => el.getAttribute("href")) : "";
        })
        .then((res) => {
          return res && typeof res === "string"
            ? "https://newsroom.pinterest.com" + res.trim()
            : "";
        })
        .catch((error) => {
          console.log(error);
          return "";
        });
      const dataItem = { date, title, link };
      data.push(dataItem);
    }
  };

  // Extract data from items
  await extractData();
  let nextPageButton = await page.$(
    "li.pagination__item--next a:not(.pagination__item--disabled)"
  );
  while (nextPageButton) {
    await nextPageButton.evaluate((el) => el.click());
    await wait(5000);
    await extractData();
    nextPageButton = await page
      .$("li.pagination__item--next a:not(.pagination__item--disabled)")
      .then((res) => res || null)
      .catch(() => null);
  }
  console.log("Pinterest: Data extracted from items");

  // Close browser
  await browser.close();
  console.log("Pinterest: Browser closed");

  // Return data
  return data;
};

const getItemsData = async (items) => {
  // Launch browser
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  console.log("Pinterest: Browser launched");

  // Extract item data
  const n = items.length;
  const data = [];
  for (let i = 0; i < n; i++) {
    try {
      console.log(`Pinterest: ${i + 1}/${n}`);
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
      const description = await page
        .$("div.text-tile p")
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
      const tagElements = await page.$$("div.attribution__items a");
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
      const author = "";
      const url = item.link;
      const newAnnouncement = announcement(
        "Pinterest",
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
        throw new Error("Pinterest: Invalid data");
      }
    } catch (error) {
      console.log(error);
    }
  }
  console.log("Pinterest: Item data extracted");

  // Close browser
  await browser.close();
  console.log("Pinterest: Browser closed");

  // Return data
  return data;
};

const getItemsText = async (items) => {
  // Launch browser
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  console.log("Pinterest: Browser launched");

  // Extract item data
  const n = items.length;
  const data = [];
  for (let i = 0; i < n; i++) {
    try {
      const item = items[i];
      await page.goto(item.url);
      wait(5000);
      console.log("Pinterest: " + (i + 1) + "/" + n);
      const text = await page
        .$("div.text-tile")
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
