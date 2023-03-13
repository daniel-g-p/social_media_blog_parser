import puppeteer from "puppeteer";

import monthToNumber from "../utilities/month-to-number.js";
import wait from "../utilities/wait.js";

import announcement from "../models/announcement.js";

const getItems = async () => {
  // Launch browser
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  console.log("Snapchat: Browser launched");

  // Open newsroom
  await page.goto("https://newsroom.snap.com/news");
  await wait(5000);
  console.log("Snapchat: Newsroom opened");

  // Load entire item history
  let loadMoreButton = await page.$(
    "button.button.button-regular.button-primary.css-14w0lcv"
  );
  while (loadMoreButton) {
    await loadMoreButton.evaluate((el) => el.click());
    await wait(5000);
    const lastItemTitle = await page
      .$("a.css-g65o95:last-child")
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
    loadMoreButton =
      lastItemTitle !== "Million Images"
        ? await page
            .$("button.button.button-regular.button-primary.css-14w0lcv")
            .then((res) => res || null)
            .catch(() => null)
        : null;
  }
  console.log("Snapchat: Item history loaded");

  // Extract data from items
  const data = [];
  const items = await page.$$("div.css-le57l3 a.css-g65o95");
  for (const item of items) {
    const title = await item
      .evaluate((el) => el.textContent)
      .then((res) => {
        return res && typeof res === "string" ? res.trim() : "";
      })
      .catch((error) => {
        console.log(error);
        return "";
      });
    const link = await item
      .evaluate((el) => el.getAttribute("href"))
      .then((res) => {
        return res && typeof res === "string"
          ? "https://newsroom.snap.com/" + res.trim()
          : "";
      })
      .catch((error) => {
        console.log(error);
        return "";
      });
    const dataItem = { title, link };
    data.push(dataItem);
  }
  console.log("Snapchat: Data extracted from items");

  // Close browser
  await browser.close();
  console.log("Snapchat: Browser closed");

  // Return data
  return data;
};

const getItemsData = async (items) => {
  // Launch browser
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  console.log("Snapchat: Browser launched");

  // Extract item data
  const n = items.length;
  const data = [];
  for (let i = 0; i < n; i++) {
    try {
      console.log(`Snapchat: ${i + 1}/${n}`);
      const item = items[i];
      await page.goto(item.link);
      await wait(5000);
      const dateText = await page
        .$("h1")
        .then((res) => {
          return res
            ? res.evaluate((el) => el.previousElementSibling.textContent)
            : "";
        })
        .then((res) => {
          return res && typeof res === "string" ? res.trim() : "";
        })
        .catch(() => "");
      const year = dateText ? +dateText.split(" ")[2] : null;
      const month = dateText ? monthToNumber(dateText.split(" ")[0]) : "";
      const day = dateText ? +dateText.split(" ")[1].replace(",", "") : null;
      const date = new Date(year, month, day);
      const title = item.title;
      const description = await page
        .$("h1 + div")
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
      const tags = [];
      const author = "";
      const url = item.link;
      const newAnnouncement = announcement(
        "Snapchat",
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
        throw new Error("Snapchat: Invalid data");
      }
    } catch (error) {
      console.log(error);
    }
  }
  console.log("Snapchat: Item data extracted");

  // Close browser
  await browser.close();
  console.log("Snapchat: Browser closed");

  // Return data
  return data;
};

const getItemsText = async (items) => {
  // Launch browser
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  console.log("Snapchat: Browser launched");

  // Extract item data
  const n = items.length;
  const data = [];
  for (let i = 0; i < n; i++) {
    try {
      const item = items[i];
      await page.goto(item.url);
      wait(5000);
      console.log("Snapchat: " + (i + 1) + "/" + n);
      const text = await page
        .$("div.body-container")
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
