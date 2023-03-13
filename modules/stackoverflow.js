import puppeteer from "puppeteer";

import monthToNumber from "../utilities/month-to-number.js";
import wait from "../utilities/wait.js";

import announcement from "../models/announcement.js";

const getItems = async () => {
  // Launch browser
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  console.log("Stack Overflow: Browser launched");

  // Open newsroom
  await page.goto("https://stackoverflow.blog/company");
  await wait(5000);
  console.log("Stack Overflow: Newsroom opened");

  // Define function to extract data from items
  const data = [];
  const extractData = async () => {
    const items = await page.$$("div.grid.ff-row-wrap > div");
    for (const item of items) {
      const category = await item
        .$("a.s-tag")
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
        .$("span.fc-black-300")
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
        .$("a.fc-black-800")
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
        .$("a.fc-black-800")
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
        .$("div.lh-excerpt")
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
        const dataItem = { category, date, title, link, preview };
        data.push(dataItem);
      }
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
  console.log("Stack Overflow: Data extracted from items");

  // Close browser
  await browser.close();
  console.log("Stack Overflow: Browser closed");

  // Return data
  return data;
};

const getItemsData = async (items) => {
  // Launch browser
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  console.log("Stack Overflow: Browser launched");

  // Extract item data
  const n = items.length;
  const data = [];
  for (let i = 0; i < n; i++) {
    try {
      console.log(`Stack Overflow: ${i + 1}/${n}`);
      const item = items[i];
      await page.goto(item.link);
      await wait(5000);
      const dateText = item.date;
      const year = dateText ? +dateText.split(" ")[2] : null;
      const month = dateText ? monthToNumber(dateText.split(" ")[0]) : "";
      const day = dateText ? +dateText.split(" ")[1].replace(",", "") : null;
      const date = new Date(year, month, day);
      const title = item.title;
      const description = await page
        .$("h1 + div.lh-excerpt")
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
      const tags = item.category ? [item.category] : [];
      const author = await page
        .$("div.author")
        .then((res) => {
          return res ? res.evaluate((el) => el.textContent) : "";
        })
        .then((res) => {
          return res && typeof res === "string"
            ? res
                .split("\n")
                .map((x) => x.trim())
                .filter((x) => x)
                .join(" - ")
                .trim()
            : "";
        })
        .catch((error) => {
          console.log(error);
          return "";
        });
      const url = item.link;
      const newAnnouncement = announcement(
        "Stack Overflow",
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
        throw new Error("Stack Overflow: Invalid data");
      }
    } catch (error) {
      console.log(error);
    }
  }
  console.log("Stack Overflow: Item data extracted");

  // Close browser
  await browser.close();
  console.log("Stack Overflow: Browser closed");

  // Return data
  return data;
};

const getItemsText = async (items) => {
  // Launch browser
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  console.log("Stack Overflow: Browser launched");

  // Extract item data
  const n = items.length;
  const data = [];
  for (let i = 0; i < n; i++) {
    try {
      const item = items[i];
      await page.goto(item.url);
      wait(5000);
      console.log("Stack Overflow: " + (i + 1) + "/" + n);
      const text = await page
        .$("div.p-article")
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
