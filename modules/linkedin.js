import puppeteer from "puppeteer";

import monthToNumber from "../utilities/month-to-number.js";
import wait from "../utilities/wait.js";

import announcement from "../models/announcement.js";

const getItems = async () => {
  // Launch browser
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  console.log("LinkedIn: Browser launched");

  // Open Instagram newsroom
  await page.goto("https://news.linkedin.com");
  await wait(5000);
  console.log("LinkedIn: Newsroom opened");

  // Dafine function to extract data from items
  const data = [];
  const extractData = async () => {
    const items = await page.$$("ul.post-list li.post-list-item");
    for (const item of items) {
      const title = await item
        .$("a.post-headline")
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
        .$("a.post-headline")
        .then((res) => {
          return res ? res.evaluate((el) => el.getAttribute("href")) : "";
        })
        .then((res) => {
          return res && typeof res === "string"
            ? "https://news.linkedin.com" + res.trim()
            : "";
        })
        .catch((error) => {
          console.log(error);
          return "";
        });
      const author = await item
        .$("a.post-entity-3-col")
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
        .$("time.date")
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
      const preview = await item
        .$("p.post-summary")
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
      const categories = await item
        .$("ul.topics")
        .then((res) => {
          return res ? res.evaluate((el) => el.textContent) : "";
        })
        .then((res) => {
          return res && typeof res === "string"
            ? res
                .replace("Categories:", "")
                .split("\n")
                .join("")
                .split(",")
                .map((category) => category.trim())
            : "";
        })
        .catch((error) => {
          console.log(error);
          return "";
        });

      const dataItem = { title, link, author, date, preview, categories };
      data.push(dataItem);
    }
  };

  // Extract data from items
  await extractData();
  let nextPageButton = await page.$(
    "a.directional-pagination.next:not(.disabled)"
  );
  // while (nextPageButton) {
  //   await nextPageButton.evaluate((el) => el.click());
  //   await wait(5000);
  //   await extractData();
  //   nextPageButton = await page
  //     .$("a.directional-pagination.next:not(.disabled)")
  //     .then((res) => res || null)
  //     .catch(() => null);
  // }
  console.log("LinkedIn: Data extracted from items");

  // Close browser
  await browser.close();
  console.log("LinkedIn: Browser closed");

  // Return data
  return data;
};

const getItemsData = async (items) => {
  // Launch browser
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  console.log("LinkedIn: Browser launched");

  const n = items.length;
  const data = [];
  for (let i = 0; i < n; i++) {
    try {
      console.log(`LinkedIn: ${i + 1}/${n}`);
      const item = items[i];
      await page.goto(item.link);
      await wait(5000);
      const year = item.date ? +item.date.split(", ")[1] : null;
      const month = item.date ? monthToNumber(item.date.split(" ")[0]) : "";
      const day = item.date ? +item.date.split(" ")[1].split(",")[0] : null;
      const date = new Date(year, month, day);
      const title = await page
        .$("h1.blog-post-title")
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
      const description = await page
        .$("div.post-par p")
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
      const tags = item.categories;
      const author = item.author;
      const url = item.link;
      const newAnnouncement = announcement(
        "LinkedIn",
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
        throw new Error("LinkedIn: Invalid data");
      }
    } catch (error) {
      console.log(error);
    }
  }
  console.log("LinkedIn: Item data extracted");

  // Close browser
  await browser.close();
  console.log("LinkedIn: Browser closed");

  // Return data
  return data;
};

export default { getItems, getItemsData };
