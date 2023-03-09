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
  // while (nextPageButton) {
  //   await nextPageButton.evaluate((el) => el.click());
  //   await wait(5000);
  //   await extractData();
  //   nextPageButton = await page
  //     .$("li.pagination__item--next a:not(.pagination__item--disabled)")
  //     .then((res) => res || null)
  //     .catch(() => null);
  // }
  console.log("Pinterest: Data extracted from items");

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
  console.log("Pinterest: Browser launched");

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

export default { getItems, getItemsData };

// import puppeteer from "../utilities/puppeteer.js";
// import wait from "../utilities/wait.js";
// import write from "../utilities/write.js";

// export default async () => {
//   const browser = await puppeteer(false);
//   console.log("1. Browser launched");

//   const page = await browser.newPage();
//   await page.goto("https://newsroom.pinterest.com/en");
//   await wait(3000);
//   console.log("2. Page opened");

//   let nextPageButton;
//   const items = [];
//   const scrapeItems = async () => {
//     await wait(3000);
//     const liElements = await page.$$("div.success-stories figure.image-tile");
//     for (const liElement of liElements) {
//       const dateElement = await liElement.$("time");
//       const dateText = dateElement
//         ? await dateElement.evaluate((el) => el.textContent)
//         : "";
//       const date =
//         dateText && typeof dateText === "string" ? dateText.trim() : "";
//       const titleElement = await liElement.$("a.link--more");
//       const titleText = titleElement
//         ? await titleElement.evaluate((el) => el.textContent)
//         : "";
//       const title =
//         titleText && typeof titleText === "string" ? titleText.trim() : "";
//       const linkText = titleElement
//         ? await titleElement.evaluate((el) => el.getAttribute("href"))
//         : "";
//       const link =
//         linkText && typeof linkText === "string"
//           ? "https://newsroom.pinterest.com" + linkText.toLowerCase().trim()
//           : "";
//       const item = { date, title, link };
//       items.push(item);
//     }
//     nextPageButton = await page.$(
//       "li.pagination__item--next a:not(.pagination__item--disabled)"
//     );
//   };
//   await scrapeItems();
//   while (nextPageButton) {
//     await nextPageButton.evaluate((el) => el.click());
//     await scrapeItems();
//   }
//   console.log("3. Blog elements parsed");

//   const fileName = "./output/pinterest-" + Date.now() + ".json";
//   const fileData = JSON.stringify(items);
//   await write(fileName, fileData);
//   console.log("4. Scrape process completed");

//   await browser.close();
//   console.log("5. Browser closed");

//   return;
// };
