import puppeteer from "puppeteer";

import monthToNumber from "../utilities/month-to-number.js";
import wait from "../utilities/wait.js";

import announcement from "../models/announcement.js";

const getItems = async () => {
  // Launch browser
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  console.log("Instagram: Browser launched");

  // Open newsroom
  await page.goto("https://about.instagram.com/blog");
  await wait(5000);
  console.log("Instagram: Newsroom opened");

  // Load entire item history
  let loadMoreButton = await page.$("button._afnw");
  while (loadMoreButton) {
    await loadMoreButton.evaluate((el) => el.click());
    await wait(5000);
    loadMoreButton = await page
      .$("button._afnw")
      .then((res) => res || null)
      .catch(() => null);
  }
  console.log("Instagram: Item history loaded");

  // Extract data from items
  const data = [];
  const items = await page.$$("li._agif._ajte");
  for (const item of items) {
    const tagElements = await item.$$("a._8hyj._9gii");
    const tags = [];
    for (const tagElement of tagElements) {
      const tag = tagElement
        ? await tagElement
            .evaluate((el) => el.textContent)
            .then((res) => {
              return res && typeof res === "string"
                ? res.replace("#", "").trim()
                : "";
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
    const title = await item
      .$("div._agih a._9gii")
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
      .$("div._agih a._9gii")
      .then((res) => {
        return res ? res.evaluate((el) => el.getAttribute("href")) : "";
      })
      .then((res) => {
        return res && typeof res === "string"
          ? "https://about.instagram.com" + res.trim()
          : "";
      })
      .catch((error) => {
        console.log(error);
        return "";
      });
    const dataItem = { tags, title, link };
    data.push(dataItem);
  }
  console.log("Instagram: Data extracted from items");

  // Close browser
  await browser.close();
  console.log("Instagram: Browser closed");

  // Return data
  return data;
};

const getItemsData = async (items) => {
  // Launch browser
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  console.log("Instagram: Browser launched");

  // Extract item data
  const n = items.length;
  const data = [];
  for (let i = 0; i < n; i++) {
    try {
      console.log(`Instagram: ${i + 1}/${n}`);
      const item = items[i];
      await page.goto(item.link);
      await wait(10000);
      const dateElements = await page.$$("div._8hlz p._a8td._abs4");
      const dateElementsLength = dateElements.length;
      let dateElementsCounter = 0;
      let dateText = "";
      while (dateElementsCounter < dateElementsLength && !dateText) {
        const element = dateElements[dateElementsCounter];
        const text = element
          ? await element
              .evaluate((el) => el.textContent)
              .then((res) => {
                return res && typeof res === "string"
                  ? res.replace("Posted on", "").trim()
                  : "";
              })
              .catch(() => "")
          : "";
        if (text) {
          dateText = text;
        }
        dateElementsCounter++;
      }
      const year = dateText ? +dateText.split(" ")[2] : null;
      const month = dateText ? monthToNumber(dateText.split(" ")[0]) : "";
      const day = dateText ? +dateText.split(" ")[1].replace(",", "") : null;
      const date = new Date(year, month, day);
      const title = await page
        .$("head title")
        .then((res) => {
          return res ? res.evaluate((el) => el.textContent) : "";
        })
        .then((res) => {
          return res && typeof res === "string"
            ? res.replace("| Instagram Blog", "").trim()
            : "";
        })
        .catch((error) => {
          console.log(error);
          return "";
        });
      const description = await page
        .$('head meta[name="description"]')
        .then((res) => {
          return res ? res.evaluate((el) => el.getAttribute("content")) : "";
        })
        .then((res) => {
          return res && typeof res === "string" ? res.trim() : "";
        })
        .catch((error) => {
          console.log(error);
          return "";
        });
      const tags = item.tags;
      const author = "";
      const url = item.link;
      const newAnnouncement = announcement(
        "Instagram",
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
        throw new Error("Instagram: Invalid data");
      }
    } catch (error) {
      console.log(error);
    }
  }
  console.log("Instagram: Item data extracted");

  // Close browser
  await browser.close();
  console.log("Instagram: Browser closed");

  // Return data
  return data;
};

const getItemsText = async (items) => {
  // Launch browser
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  console.log("Instagram: Browser launched");

  // Extract item data
  const n = items.length;
  const data = [];
  for (let i = 0; i < n; i++) {
    try {
      const item = items[i];
      await page.goto(item.url);
      await wait(7500);
      console.log("Instagram: " + (i + 1) + "/" + n);
      const text = await page
        .$("div._8ig0._8g86")
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

const getItemsText2 = async (items) => {
  // Launch browser
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  console.log("Instagram: Browser launched");

  // Extract item data
  const n = items.length;
  const data = [];
  for (let i = 0; i < n; i++) {
    try {
      const item = items[i];
      await page.goto(item.url);
      await wait(7500);
      console.log("Instagram: " + (i + 1) + "/" + n);
      const text = await page
        .$$("._aevd")
        .then(async (res) => {
          const strings = [];
          if (res && Array.isArray(res)) {
            for (const element of res) {
              const elementText = await element.evaluate((el) => {
                return el.textContent;
              });
              if (elementText && typeof elementText === "string") {
                strings.push(elementText);
              }
            }
          }
          return strings
            .map((string) => string.trim())
            .filter((string) => string)
            .join(" ");
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
                .split("RELATED ARTICLES")[0]
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

export default { getItems, getItemsData, getItemsText, getItemsText2 };
