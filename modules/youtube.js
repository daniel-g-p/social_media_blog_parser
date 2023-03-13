import puppeteer from "puppeteer";

import monthToNumber from "../utilities/month-to-number.js";
import wait from "../utilities/wait.js";

import announcement from "../models/announcement.js";

const getItems = async () => {
  // Launch browser
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  console.log("YouTube: Browser launched");

  // Open newsroom
  await page.goto("https://blog.youtube/news-and-events");
  await wait(5000);
  console.log("YouTube: Newsroom opened");

  // Load entire item history
  let loadMoreButton = await page.$("button.yt-latest-articles__load-more");
  while (loadMoreButton) {
    await loadMoreButton.evaluate((el) => el.click());
    await wait(5000);
    const lastItemTime = await page
      .$("li.yt-latest-articles__item:last-child")
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
      lastItemTime !== "Jul.07.2005"
        ? await page
            .$("button.yt-latest-articles__load-more")
            .then((res) => res || null)
            .catch(() => null)
        : null;
  }
  console.log("YouTube: Item history loaded");

  const data = [];
  const items = await page.$$("li.yt-latest-articles__item");
  for (const item of items) {
    const category = await item
      .$("p.yt-latest-articles__category")
      .then((res) => {
        return res ? res.evaluate((el) => el.textContent) : null;
      })
      .then((res) => {
        return res && typeof res === "string" ? res.trim() : "";
      })
      .catch((error) => {
        console.log(error);
        return "";
      });
    const title = await item
      .$("h3.yt-latest-articles__title")
      .then((res) => {
        return res ? res.evaluate((el) => el.textContent) : null;
      })
      .then((res) => {
        return res && typeof res === "string" ? res.trim() : "";
      })
      .catch((error) => {
        console.log(error);
        return "";
      });
    const date = await item
      .$("time.yt-latest-articles__date")
      .then((res) => {
        return res ? res.evaluate((el) => el.textContent) : null;
      })
      .then((res) => {
        return res && typeof res === "string" ? res.trim() : "";
      })
      .catch((error) => {
        console.log(error);
        return "";
      });
    const link = await item
      .$("a.yt-latest-articles__link")
      .then((res) => {
        return res ? res.evaluate((el) => el.getAttribute("href")) : null;
      })
      .then((res) => {
        return res && typeof res === "string" ? res.trim() : "";
      })
      .catch((error) => {
        console.log(error);
        return "";
      });
    const dataItem = { category, title, date, link };
    data.push(dataItem);
  }
  console.log("YouTube: Data extracted from items");

  // Close browser
  await browser.close();
  console.log("YouTube: Browser closed");

  // Return data
  return data;
};

const getItemsData = async (items) => {
  console.log(items);
  // Launch browser
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  console.log("YouTube: Browser launched");

  // Extract item data
  const n = items.length;
  const data = [];
  for (let i = 0; i < n; i++) {
    try {
      console.log(`YouTube: ${i + 1}/${n}`);
      const item = items[i];
      await page.goto(item.link);
      await wait(5000);
      const year = item.date ? +item.date.split(".")[2] : null;
      const month = item.date ? monthToNumber(item.date.split(".")[0]) : "";
      const day = item.date ? +item.date.split(".")[1] : null;
      const date = new Date(year, month, day);
      const title = item.title;
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
      const tagElements = await page.$$("ul.yt-article-rel-tags__list li");
      const tags = [];
      for (const tagElement of tagElements) {
        const tag = await tagElement
          .evaluate((el) => el.textContent)
          .then((res) => {
            return res && typeof res === "string" ? res.trim() : "";
          })
          .catch(() => {
            console.log(error);
            return "";
          });
        if (tag) {
          tags.push(tag);
        }
      }
      if (item.category && !tags.includes(item.category)) {
        tags.push(item.category);
      }
      const author = await page
        .$("ul.yt-articlepage__page-title-container-author")
        .then((res) => {
          return res ? res.evaluate((el) => el.textContent) : "";
        })
        .then((res) => {
          return res && typeof res === "string"
            ? res.trim().slice(0, 3) === "By "
              ? res
                  .slice(3)
                  .replace(item.date, "")
                  .split("\n")
                  .map((x) => x.trim())
                  .filter((x) => x)
                  .join(" - ")
              : res
                  .replace(item.date, "")
                  .split("\n")
                  .map((x) => x.trim())
                  .filter((x) => x)
                  .join(" - ")
            : "";
        })
        .catch((error) => {
          console.log(error);
          return "";
        });
      const url = item.link;
      const newAnnouncement = announcement(
        "YouTube",
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
        throw new Error("YouTube: Invalid data");
      }
    } catch (error) {
      console.log(error);
    }
  }
  console.log("YouTube: Item data extracted");

  // Close browser
  await browser.close();
  console.log("YouTube: Browser closed");

  // Return data
  return data;
};

const getItemsText = async (items) => {
  // Launch browser
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  console.log("YouTube: Browser launched");

  // Extract item data
  const n = items.length;
  const data = [];
  for (let i = 0; i < n; i++) {
    try {
      const item = items[i];
      await page.goto(item.url);
      wait(5000);
      console.log("YouTube: " + (i + 1) + "/" + n);
      const text = await page
        .$$("div.yt-article-main-content section.js-yt-gtm-media-paragraph")
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
