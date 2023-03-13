import puppeteer from "puppeteer";

import monthToNumber from "../utilities/month-to-number.js";
import read from "../utilities/read.js";
import wait from "../utilities/wait.js";

import announcement from "../models/announcement.js";

const getItems = async () => {
  // Launch browser
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  console.log("TikTok: Browser launched");

  // Open newsroom
  read;
  const html = await read("./input/tiktok.html")
    .then((res) => res.toString())
    .catch((error) => {
      console.log(error);
    });
  await page.setContent(html, { waitUntil: "domcontentloaded" });
  await wait(5000);
  console.log("TikTok: Newsroom opened");

  // Extract data from items
  const data = [];
  const items = await page.$$(
    "div.newsroom-list-wrapper article.newsroom-item-card"
  );
  for (const item of items) {
    const category = await item
      .$("h3.header-tag a.tag")
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
      .$("h3.header-tag span.date")
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
      .$("h2")
      .then((res) => {
        return res ? res.evaluate((el) => el.textContent) : "";
      })
      .then((res) => {
        return res && typeof res === "string"
          ? res
              .trim()
              .split("\n")
              .map((x) => x.trim())
              .filter((x) => x)
              .join(" ")
          : "";
      })
      .catch((error) => {
        console.log(error);
        return "";
      });
    const link = await item
      .$("h2")
      .then((res) => {
        return res
          ? res.evaluate((el) => el.parentElement.getAttribute("href"))
          : null;
      })
      .then((res) => {
        return res && typeof res === "string" ? res.trim() : "";
      })
      .catch((error) => {
        console.log(error);
        return "";
      });
    const preview = await item
      .$("p.desc")
      .then((res) => {
        return res ? res.evaluate((el) => el.innerText) : "";
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
  console.log("TikTok: Data extracted from items");

  // Close browser
  await browser.close();
  console.log("TikTok: Browser closed");

  // Return data
  return data;
};

const getItemsData = async (items) => {
  // Launch browser
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  console.log("TikTok: Browser launched");

  // Extract item data
  const n = items.length;
  const data = [];
  for (let i = 0; i < n; i++) {
    try {
      console.log(`TikTok: ${i + 1}/${n}`);
      const item = items[i];
      await page.goto(item.link);
      await wait(5000);
      const year = item.date ? +item.date.split(" ")[2] : null;
      const month = item.date ? monthToNumber(item.date.split(" ")[0]) : "";
      const day = item.date ? +item.date.split(" ")[1].replace(",", "") : null;
      const date = new Date(year, month, day);
      const title = item.title;
      const descriptionElements = await page.$$("div.post-content p");
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
      const author = "";
      const url = item.link;
      const newAnnouncement = announcement(
        "TikTok",
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
        throw new Error("TikTok: Invalid data");
      }
    } catch (error) {
      console.log(error);
    }
  }
  console.log("TikTok: Item data extracted");

  // Close browser
  await browser.close();
  console.log("TikTok: Browser closed");

  // Return data
  return data;
};

const getItemsText = async (items) => {
  // Launch browser
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  console.log("TikTok: Browser launched");

  // Extract item data
  const n = items.length;
  const data = [];
  for (let i = 0; i < n; i++) {
    try {
      const item = items[i];
      await page.goto(item.url);
      await wait(2500);
      console.log("TikTok: " + (i + 1) + "/" + n);
      const text = await page
        .$("div.post-content")
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
