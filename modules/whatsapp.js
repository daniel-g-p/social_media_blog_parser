import puppeteer from "puppeteer";

import monthToNumber from "../utilities/month-to-number.js";
import wait from "../utilities/wait.js";

import announcement from "../models/announcement.js";

const getItems = async () => {
  // Launch browser
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  console.log("WhatsApp: Browser launched");

  // Open newsroom
  await page.goto("https://blog.whatsapp.com");
  await wait(5000);
  console.log("WhatsApp: Newsroom opened");

  const data = [];
  const extractData = async () => {
    const items = await page.$$("div._9r_7._9t33");
    for (const item of items) {
      const title = await item
        .$("h1")
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
        .$("a")
        .then((res) => {
          return res ? res.evaluate((el) => el.getAttribute("href")) : "";
        })
        .then((res) => {
          return res && typeof res === "string"
            ? "https://blog.whatsapp.com" + res.trim()
            : "";
        })
        .catch((error) => {
          console.log(error);
          return "";
        });
      const date = await item
        .$("article._9ta2")
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
        const dataItem = { title, link, date };
        data.push(dataItem);
      }
    }
  };

  await extractData();
  let nextPageButton = await page.$("a._9vcv._advn._9scd._9sct");
  while (nextPageButton) {
    await nextPageButton.evaluate((el) => el.click());
    await wait(5000);
    await extractData();
    nextPageButton = await page
      .$("a._9vcv._advn._9scd._9sct")
      .then((res) => res || null)
      .catch(() => null);
  }
  console.log("WhatsApp: Data extracted from items");

  // Close browser
  await browser.close();
  console.log("WhatsApp: Browser closed");

  // Return data
  return data;
};

const getItemsData = async (items) => {
  // Launch browser
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  console.log("WhatsApp: Browser launched");

  // Extract item data
  const n = items.length;
  const data = [];
  for (let i = 0; i < n; i++) {
    try {
      console.log(`WhatsApp: ${i + 1}/${n}`);
      const item = items[i];
      await page.goto(item.link);
      await wait(5000);
      const year = item.date ? +item.date.split(" ")[2] : null;
      const month = item.date ? monthToNumber(item.date.split(" ")[0]) : "";
      const day = item.date ? +item.date.split(" ")[1].replace(",", "") : null;
      const date = new Date(year, month, day);
      const title = item.title;
      const descriptionElements = await page.$$("h1 ~ div._8l_f p");
      const descriptionElementsLength = descriptionElements.length;
      let descriptionElementsCounter = 0;
      let description = "";
      while (
        descriptionElementsCounter < descriptionElementsLength &&
        !description
      ) {
        const element = descriptionElements[descriptionElementsCounter];
        const text = await element
          .evaluate((el) => el.textContent)
          .then((res) => {
            return res && typeof res === "string" && res.length > 100
              ? res.trim()
              : "";
          })
          .catch(() => "");
        if (text) {
          description = text;
        }
        descriptionElementsCounter++;
      }
      const tags = [];
      const author = "";
      const url = item.link;
      const newAnnouncement = announcement(
        "WhatsApp",
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
        throw new Error("WhatsApp: Invalid data");
      }
    } catch (error) {
      console.log(error);
    }
  }
  console.log("WhatsApp: Item data extracted");

  // Close browser
  await browser.close();
  console.log("WhatsApp: Browser closed");

  // Return data
  return data;
};

const getItemsText = async (items) => {
  // Launch browser
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  console.log("WhatsApp: Browser launched");

  // Extract item data
  const n = items.length;
  const data = [];
  for (let i = 0; i < n; i++) {
    try {
      const item = items[i];
      await page.goto(item.url);
      await wait(2500);
      console.log("WhatsApp: " + (i + 1) + "/" + n);
      const text = await page
        .$("div._9t2g._9t2c div._8l_f")
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
