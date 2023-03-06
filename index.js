import XLSX from "xlsx";

import facebook from "./modules/facebook.js";
import instagram from "./modules/instagram.js";
import stackoverflow from "./modules/stackoverflow.js";
import pinterest from "./modules/pinterest.js";
import youtube from "./modules/youtube.js";
import linkedin from "./modules/linkedin.js";
import snapchat from "./modules/snapchat.js";
import twitter from "./modules/twitter.js";
import whatsapp from "./modules/whatsapp.js";
import reddit from "./modules/reddit.js";
import tiktok from "./modules/tiktok.js";

import announcement from "./models/announcement.js";

import read from "./utilities/read.js";
import puppeteer from "./utilities/puppeteer.js";
import wait from "./utilities/wait.js";
import write from "./utilities/write.js";

const processFacebookData = async (items) => {
  const browser = await puppeteer(true);
  const page = await browser.newPage();
  const announcements = [];
  const n = items.length;
  for (let i = 0; i < n; i++) {
    try {
      console.log(`Facebook (${i + 1}/${n})`);
      const item = items[i];
      await page.goto(item.link);
      await wait(2500);
      const dateYear = item.time ? +item.time.split(", ")[1] : null;
      const dateMonthString = item.time ? item.time.split(" ")[0] : "";
      const dateMonth =
        dateMonthString === "January"
          ? 0
          : dateMonthString === "February"
          ? 1
          : dateMonthString === "March"
          ? 2
          : dateMonthString === "April"
          ? 3
          : dateMonthString === "May"
          ? 4
          : dateMonthString === "June"
          ? 5
          : dateMonthString === "July"
          ? 6
          : dateMonthString === "August"
          ? 7
          : dateMonthString === "September"
          ? 8
          : dateMonthString === "October"
          ? 9
          : dateMonthString === "November"
          ? 10
          : dateMonthString === "December"
          ? 11
          : null;
      const dateDay = item.time ? +item.time.split(" ")[1].split(",")[0] : null;
      const date = new Date(dateYear, dateMonth, dateDay);
      const title = item.title;
      const description = item.preview;
      const tagElements = await page.$$("div.entry-categories a");
      const tags = [];
      for (const tagElement of tagElements) {
        const tagText = tagElement
          ? await tagElement.evaluate((el) => el.textContent)
          : "";
        const tag =
          tagText && typeof tagText === "string" ? tagText.trim() : "";
        if (tag) {
          tags.push(tag);
        }
      }
      const authorElement = await page.$("div.post-custom_author");
      const authorText = authorElement
        ? await authorElement.evaluate((el) => el.textContent)
        : "";
      const author =
        authorText && typeof authorText === "string"
          ? authorText.slice(0, 3) === "By "
            ? authorText.slice(3).trim()
            : authorText.trim()
          : "";
      const url = item.link;
      const newAnnouncement = announcement(
        "Facebook",
        date,
        title,
        description,
        tags,
        author,
        url
      );
      if (newAnnouncement) {
        announcements.push(newAnnouncement);
      }
    } catch {
      console.log("Error at i=" + i);
    }
  }
  await browser.close();
  return announcements;
};

const processInstagramData = async (items) => {
  const browser = await puppeteer(true);
  const page = await browser.newPage();
  const announcements = [];
  const n = items.length;
  for (let i = 0; i < n; i++) {
    try {
      console.log(`Instagram (${i + 1}/${n})`);
      const item = items[i];
      await page.goto(item.link);
      await wait(5000);
      const dateElements = await page.$$("div._8hlz p._a8td._abs4");
      let dateText = "";
      let dateElementsCounter = 0;
      const dateElementsLength = dateElements.length;
      while (!dateText && dateElementsCounter < dateElementsLength) {
        const element = dateElements[dateElementsCounter];
        const text = element
          ? await element.evaluate((el) => el.textContent)
          : "";
        if (text && typeof text === "string") {
          dateText = text.replace("Posted on", "").trim();
        }
        dateElementsCounter++;
      }
      const dateYear = dateText ? +dateText.split(" ")[2] : null;
      const dateMonthString = dateText ? dateText.split(" ")[0] : "";
      const dateMonth =
        dateMonthString === "January"
          ? 0
          : dateMonthString === "February"
          ? 1
          : dateMonthString === "March"
          ? 2
          : dateMonthString === "April"
          ? 3
          : dateMonthString === "May"
          ? 4
          : dateMonthString === "June"
          ? 5
          : dateMonthString === "July"
          ? 6
          : dateMonthString === "August"
          ? 7
          : dateMonthString === "September"
          ? 8
          : dateMonthString === "October"
          ? 9
          : dateMonthString === "November"
          ? 10
          : dateMonthString === "December"
          ? 11
          : null;
      const dateDay = dateText
        ? +dateText.split(" ")[1].replace(",", "")
        : null;
      const date = new Date(dateYear, dateMonth, dateDay);
      const titleElement = await page.$("head title");
      const titleText = titleElement
        ? await titleElement.evaluate((el) => el.textContent)
        : "";
      const title =
        titleText && typeof titleText === "string"
          ? titleText.replace("| Instagram Blog", "").trim()
          : "";
      const descriptionElement = await page.$('head meta[name="description"]');
      const descriptionText = descriptionElement
        ? await descriptionElement.evaluate((el) => el.getAttribute("content"))
        : "";
      const description =
        descriptionText && typeof descriptionText === "string"
          ? descriptionText.trim()
          : "";
      const tags = item.hashtags;
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
        announcements.push(newAnnouncement);
      } else {
        console.log("Invalid data at i=" + i);
      }
    } catch (error) {
      console.log("Error at i=" + i);
      console.error(error);
    }
  }
  await browser.close();
  return announcements;
};

const processLinkedinData = async (items) => {
  const browser = await puppeteer(true);
  const page = await browser.newPage();
  const announcements = [];
  const n = items.length;
  for (let i = 0; i < n; i++) {
    try {
      console.log(`LinkedIn (${i + 1}/${n})`);
      const item = items[i];
      await page.goto(item.link);
      await wait(2500);
      const dateYear = item.date ? +item.date.split(", ")[1] : null;
      const dateMonthString = item.date ? item.date.split(" ")[0] : "";
      const dateMonth =
        dateMonthString === "Jan"
          ? 0
          : dateMonthString === "Feb"
          ? 1
          : dateMonthString === "Mar"
          ? 2
          : dateMonthString === "Apr"
          ? 3
          : dateMonthString === "May"
          ? 4
          : dateMonthString === "Jun"
          ? 5
          : dateMonthString === "Jul"
          ? 6
          : dateMonthString === "Aug"
          ? 7
          : dateMonthString === "Sep"
          ? 8
          : dateMonthString === "Oct"
          ? 9
          : dateMonthString === "Nov"
          ? 10
          : dateMonthString === "Dec"
          ? 11
          : null;
      const dateDay = item.date ? +item.date.split(" ")[1].split(",")[0] : null;
      const date = new Date(dateYear, dateMonth, dateDay);
      const titleElement = await page.$("h1.blog-post-title");
      const titleText = titleElement
        ? await titleElement.evaluate((el) => el.textContent)
        : "";
      const title =
        titleText && typeof titleText === "string" ? titleText.trim() : "";
      const descriptionElement = await page.$("div.post-par p");
      const descriptionText = descriptionElement
        ? await descriptionElement.evaluate((el) => el.textContent)
        : "";
      const description =
        descriptionText && typeof descriptionText === "string"
          ? descriptionText.trim()
          : "";
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
        announcements.push(newAnnouncement);
      }
    } catch {
      console.log("Error at i=" + i);
    }
  }
  await browser.close();
  return announcements;
};

const processPinterestData = async (items) => {
  const browser = await puppeteer(true);
  const page = await browser.newPage();
  const announcements = [];
  const n = items.length;
  for (let i = 0; i < n; i++) {
    try {
      console.log(`Pinterest (${i + 1}/${n})`);
      const item = items[i];
      await page.goto(item.link);
      await wait(2500);
      const dateYear = item.date ? +item.date.split(", ")[1] : null;
      const dateMonthString = item.date ? item.date.split(" ")[0] : "";
      const dateMonth =
        dateMonthString === "January"
          ? 0
          : dateMonthString === "February"
          ? 1
          : dateMonthString === "March"
          ? 2
          : dateMonthString === "April"
          ? 3
          : dateMonthString === "May"
          ? 4
          : dateMonthString === "June"
          ? 5
          : dateMonthString === "July"
          ? 6
          : dateMonthString === "August"
          ? 7
          : dateMonthString === "September"
          ? 8
          : dateMonthString === "October"
          ? 9
          : dateMonthString === "November"
          ? 10
          : dateMonthString === "December"
          ? 11
          : null;
      const dateDay =
        item.date && item.date.includes("/")
          ? +item.date.split(" ")[1].split(",")[0]
          : null;
      const date = new Date(dateYear, dateMonth, dateDay);
      const title = item.title;
      const descriptionElement = await page.$("div.text-tile p");
      const descriptionText = descriptionElement
        ? await descriptionElement.evaluate((el) => el.textContent)
        : "";
      const description =
        descriptionText && typeof descriptionText === "string"
          ? descriptionText.trim()
          : "";
      const tagElements = await page.$$("div.attribution__items a");
      const tags = [];
      for (const tagElement of tagElements) {
        const tagText = tagElement
          ? await tagElement.evaluate((el) => el.textContent)
          : "";
        const tag =
          tagText && typeof tagText === "string" ? tagText.trim() : "";
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
        announcements.push(newAnnouncement);
      }
    } catch {
      console.log("Error at i=" + i);
    }
  }
  await browser.close();
  return announcements;
};

const processRedditData = async (items) => {
  const browser = await puppeteer(true);
  const page = await browser.newPage();
  const announcements = [];
  const n = items.length;
  for (let i = 0; i < n; i++) {
    try {
      console.log(`Reddit (${i + 1}/${n})`);
      const item = items[i];
      await page.goto(item.link);
      await wait(2500);
      const dateYear = item.date ? +item.date.split(", ")[1] : null;
      const dateMonthString = item.date ? item.date.split(" ")[0] : "";
      const dateMonth =
        dateMonthString === "January"
          ? 0
          : dateMonthString === "February"
          ? 1
          : dateMonthString === "March"
          ? 2
          : dateMonthString === "April"
          ? 3
          : dateMonthString === "May"
          ? 4
          : dateMonthString === "June"
          ? 5
          : dateMonthString === "July"
          ? 6
          : dateMonthString === "August"
          ? 7
          : dateMonthString === "September"
          ? 8
          : dateMonthString === "October"
          ? 9
          : dateMonthString === "November"
          ? 10
          : dateMonthString === "December"
          ? 11
          : null;
      const dateDay =
        item.date && item.date.includes("/")
          ? +item.date.split(" ")[1].split(",")[0]
          : null;
      const date = new Date(dateYear, dateMonth, dateDay);
      const title = item.title;
      const descriptionElements = await page.$$("div.entry-content p");
      const descriptionElementsLength = descriptionElements
        ? descriptionElements.length
        : 0;
      let descriptionElementsCounter = 0;
      let descriptionText = "";
      while (
        !descriptionText &&
        descriptionElementsCounter < descriptionElementsLength
      ) {
        const element = descriptionElements[descriptionElementsCounter];
        const text = element
          ? await element.evaluate((el) => el.textContent)
          : "";
        if (text && typeof text === "string" && text.length > 100) {
          descriptionText = text;
        }
        descriptionElementsCounter++;
      }
      const description = descriptionText ? descriptionText.trim() : "";
      const tagElements = await page.$$("div.attribution__items a");
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
        announcements.push(newAnnouncement);
      }
    } catch {
      console.log("Error at i=" + i);
    }
  }
  await browser.close();
  return announcements;
};

const processSnapchatData = async (items) => {
  const browser = await puppeteer(true);
  const page = await browser.newPage();
  const announcements = [];
  const n = items.length;
  for (let i = 0; i < n; i++) {
    try {
      console.log(`Snapchat (${i + 1}/${n})`);
      const item = items[i];
      await page.goto(item.link);
      await wait(2500);
      const dateText = await page
        .$("h1")
        .then((res) => {
          if (res) {
            return res.evaluate((el) => el.previousElementSibling.textContent);
          }
        })
        .catch(() => null);
      const dateYear = dateText ? +dateText.split(" ")[2] : null;
      const dateMonthString = dateText ? dateText.split(" ")[0] : "";
      const dateMonth =
        dateMonthString === "January"
          ? 0
          : dateMonthString === "February"
          ? 1
          : dateMonthString === "March"
          ? 2
          : dateMonthString === "April"
          ? 3
          : dateMonthString === "May"
          ? 4
          : dateMonthString === "June"
          ? 5
          : dateMonthString === "July"
          ? 6
          : dateMonthString === "August"
          ? 7
          : dateMonthString === "September"
          ? 8
          : dateMonthString === "October"
          ? 9
          : dateMonthString === "November"
          ? 10
          : dateMonthString === "December"
          ? 11
          : null;
      const dateDay = dateText
        ? +dateText.split(" ")[1].replace(",", "")
        : null;
      const date = new Date(dateYear, dateMonth, dateDay);
      const title = item.title;
      const descriptionElement = await page.$("h1 + div");
      const descriptionText = descriptionElement
        ? await descriptionElement.evaluate((el) => el.textContent)
        : "";
      const description =
        descriptionText && typeof descriptionText === "string"
          ? descriptionText.trim()
          : "";
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
        announcements.push(newAnnouncement);
      }
    } catch {
      console.log("Error at i=" + i);
    }
  }
  await browser.close();
  return announcements;
};

const processStackoverflowData = async (items) => {
  const browser = await puppeteer(true);
  const page = await browser.newPage();
  const announcements = [];
  const n = items.length;
  for (let i = 0; i < n; i++) {
    try {
      console.log(`Stack Overflow (${i + 1}/${n})`);
      const item = items[i];
      await page.goto(item.link);
      await wait(2500);
      const dateText = item.date;
      const dateYear = dateText ? +dateText.split(" ")[2] : null;
      const dateMonthString = dateText ? dateText.split(" ")[0] : "";
      const dateMonth =
        dateMonthString === "January"
          ? 0
          : dateMonthString === "February"
          ? 1
          : dateMonthString === "March"
          ? 2
          : dateMonthString === "April"
          ? 3
          : dateMonthString === "May"
          ? 4
          : dateMonthString === "June"
          ? 5
          : dateMonthString === "July"
          ? 6
          : dateMonthString === "August"
          ? 7
          : dateMonthString === "September"
          ? 8
          : dateMonthString === "October"
          ? 9
          : dateMonthString === "November"
          ? 10
          : dateMonthString === "December"
          ? 11
          : null;
      const dateDay = dateText
        ? +dateText.split(" ")[1].replace(",", "")
        : null;
      const date = new Date(dateYear, dateMonth, dateDay);
      const title = item.title;
      const descriptionElement = await page.$("h1 + div.lh-excerpt");
      const descriptionText = descriptionElement
        ? await descriptionElement.evaluate((el) => el.textContent)
        : "";
      const description =
        descriptionText && typeof descriptionText === "string"
          ? descriptionText.trim()
          : "";
      const tags = item.category ? [item.category] : [];
      const authorElement = await page.$("div.author");
      const authorText = authorElement
        ? await authorElement.evaluate((el) => el.textContent)
        : "";
      const author =
        authorText && typeof authorText === "string"
          ? authorText.trim().replace("    \n    ", " - ")
          : "";
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
        announcements.push(newAnnouncement);
      }
    } catch {
      console.log("Error at i=" + i);
    }
  }
  await browser.close();
  return announcements;
};

const processTiktokData = async (items) => {
  const browser = await puppeteer(true);
  const page = await browser.newPage();
  const announcements = [];
  const n = items.length;
  for (let i = 0; i < n; i++) {
    try {
      console.log(`TikTok (${i + 1}/${n})`);
      const item = items[i];
      await page.goto(item.link);
      await wait(2500);
      const dateText = item.date;
      const dateYear = dateText ? +dateText.split(" ")[2] : null;
      const dateMonthString = dateText ? dateText.split(" ")[0] : "";
      const dateMonth =
        dateMonthString === "Jan"
          ? 0
          : dateMonthString === "Feb"
          ? 1
          : dateMonthString === "Mar"
          ? 2
          : dateMonthString === "Apr"
          ? 3
          : dateMonthString === "May"
          ? 4
          : dateMonthString === "Jun"
          ? 5
          : dateMonthString === "Jul"
          ? 6
          : dateMonthString === "Aug"
          ? 7
          : dateMonthString === "Sep"
          ? 8
          : dateMonthString === "Oct"
          ? 9
          : dateMonthString === "Nov"
          ? 10
          : dateMonthString === "Dec"
          ? 11
          : null;
      const dateDay = dateText
        ? +dateText.split(" ")[1].replace(",", "")
        : null;
      const date = new Date(dateYear, dateMonth, dateDay);
      const title = item.title;
      const descriptionElements = await page.$$("div.post-content p");
      const descriptionElementsLength = descriptionElements
        ? descriptionElements.length
        : 0;
      let descriptionElementsCounter = 0;
      let descriptionText = "";
      while (
        !descriptionText &&
        descriptionElementsCounter < descriptionElementsLength
      ) {
        const element = descriptionElements[descriptionElementsCounter];
        const text = element
          ? await element.evaluate((el) => el.textContent)
          : "";
        if (text && typeof text === "string" && text.length > 100) {
          descriptionText = text;
        }
        descriptionElementsCounter++;
      }
      const description = descriptionText ? descriptionText.trim() : "";
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
        announcements.push(newAnnouncement);
      }
    } catch {
      console.log("Error at i=" + i);
    }
  }
  await browser.close();
  return announcements;
};

const processTwitterData = async (items) => {
  const browser = await puppeteer(true);
  const page = await browser.newPage();
  const announcements = [];
  const n = items.length;
  for (let i = 0; i < n; i++) {
    try {
      console.log(`Twitter (${i + 1}/${n})`);
      const item = items[i];
      await page.goto(item.link);
      await wait(2500);
      const dateText = item.date;
      const dateYear = dateText ? +dateText.split(" ")[3] : null;
      const dateMonthString = dateText ? dateText.split(" ")[2] : "";
      const dateMonth =
        dateMonthString === "Jan"
          ? 0
          : dateMonthString === "Feb"
          ? 1
          : dateMonthString === "Mar"
          ? 2
          : dateMonthString === "Apr"
          ? 3
          : dateMonthString === "May"
          ? 4
          : dateMonthString === "Jun"
          ? 5
          : dateMonthString === "Jul"
          ? 6
          : dateMonthString === "Aug"
          ? 7
          : dateMonthString === "Sep"
          ? 8
          : dateMonthString === "Oct"
          ? 9
          : dateMonthString === "Nov"
          ? 10
          : dateMonthString === "Dec"
          ? 11
          : null;
      const dateDay = dateText ? +dateText.split(" ")[1] : null;
      const date = new Date(dateYear, dateMonth, dateDay);
      const title = item.title;
      const descriptionElement = await page.$(
        'head meta[property="og:description"]'
      );
      const descriptionText = descriptionElement
        ? await descriptionElement.evaluate((el) => el.getAttribute("content"))
        : "";
      const description =
        descriptionText && typeof descriptionText === "string"
          ? descriptionText.trim()
          : "";
      const tagElements = await page.$$("div.post__tags li");
      const tags = [];
      for (const tagElement of tagElements) {
        const tagText = tagElement
          ? await tagElement.evaluate((el) => el.textContent)
          : "";
        const tag =
          tagText && typeof tagText === "string" ? tagText.trim() : "";
        if (tag) {
          tags.push(tag);
        }
      }
      if (item.category && !tags.includes(item.category)) {
        tags.push(item.category);
      }
      const author = "";
      const url = item.link;
      const newAnnouncement = announcement(
        "Twitter",
        date,
        title,
        description,
        tags,
        author,
        url
      );
      if (newAnnouncement) {
        announcements.push(newAnnouncement);
      }
    } catch {
      console.log("Error at i=" + i);
    }
  }
  await browser.close();
  return announcements;
};

const processWhatsappData = async (items) => {
  const browser = await puppeteer(true);
  const page = await browser.newPage();
  const announcements = [];
  const n = items.length;
  for (let i = 0; i < n; i++) {
    try {
      console.log(`WhatsApp (${i + 1}/${n})`);
      const item = items[i];
      await page.goto(item.link);
      await wait(2500);
      const dateText = item.date;
      const dateYear = dateText ? +dateText.split(" ")[2] : null;
      const dateMonthString = dateText ? dateText.split(" ")[0] : "";
      const dateMonth =
        dateMonthString === "January"
          ? 0
          : dateMonthString === "February"
          ? 1
          : dateMonthString === "March"
          ? 2
          : dateMonthString === "April"
          ? 3
          : dateMonthString === "May"
          ? 4
          : dateMonthString === "June"
          ? 5
          : dateMonthString === "July"
          ? 6
          : dateMonthString === "August"
          ? 7
          : dateMonthString === "September"
          ? 8
          : dateMonthString === "October"
          ? 9
          : dateMonthString === "November"
          ? 10
          : dateMonthString === "December"
          ? 11
          : null;
      const dateDay = dateText
        ? +dateText.split(" ")[1].replace(",", "")
        : null;
      const date = new Date(dateYear, dateMonth, dateDay);
      const title = item.title;
      const descriptionElements = await page.$$("h1 ~ div._8l_f p");
      const descriptionElementsLength = descriptionElements
        ? descriptionElements.length
        : 0;
      let descriptionElementsCounter = 0;
      let descriptionText = "";
      while (
        !descriptionText &&
        descriptionElementsCounter < descriptionElementsLength
      ) {
        const element = descriptionElements[descriptionElementsCounter];
        const text = element
          ? await element.evaluate((el) => el.textContent)
          : "";
        if (text && typeof text === "string" && text.length > 100) {
          descriptionText = text;
        }
        descriptionElementsCounter++;
      }
      const description = descriptionText ? descriptionText.trim() : "";
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
        announcements.push(newAnnouncement);
      }
    } catch {
      console.log("Error at i=" + i);
    }
  }
  await browser.close();
  return announcements;
};

const processYoutubeData = async (items) => {
  const browser = await puppeteer(true);
  const page = await browser.newPage();
  const announcements = [];
  const n = items.length;
  for (let i = 0; i < n; i++) {
    try {
      console.log(`YouTube (${i + 1}/${n})`);
      const item = items[i];
      await page.goto(item.link);
      await wait(2500);
      const dateText = item.date;
      const dateYear = dateText ? +dateText.split(".")[2] : null;
      const dateMonthString = dateText ? dateText.split(".")[0] : "";
      const dateMonth =
        dateMonthString === "Jan"
          ? 0
          : dateMonthString === "Feb"
          ? 1
          : dateMonthString === "Mar"
          ? 2
          : dateMonthString === "Apr"
          ? 3
          : dateMonthString === "May"
          ? 4
          : dateMonthString === "Jun"
          ? 5
          : dateMonthString === "Jul"
          ? 6
          : dateMonthString === "Aug"
          ? 7
          : dateMonthString === "Sep"
          ? 8
          : dateMonthString === "Oct"
          ? 9
          : dateMonthString === "Nov"
          ? 10
          : dateMonthString === "Dec"
          ? 11
          : null;
      const dateDay = dateText ? +dateText.split(".")[1] : null;
      const date = new Date(dateYear, dateMonth, dateDay);
      const title = item.title;
      const descriptionElement = await page.$('head meta[name="description"]');
      const descriptionText = descriptionElement
        ? await descriptionElement.evaluate((el) => el.getAttribute("content"))
        : "";
      const description =
        descriptionText && typeof descriptionText === "string"
          ? descriptionText.trim()
          : "";
      const tagElements = await page.$$("ul.yt-article-rel-tags__list li");
      const tags = [];
      for (const tagElement of tagElements) {
        const tagText = tagElement
          ? await tagElement.evaluate((el) => el.textContent)
          : "";
        const tag =
          tagText && typeof tagText === "string" ? tagText.trim() : "";
        if (tag) {
          tags.push(tag);
        }
      }
      if (item.category && !tags.includes(item.category)) {
        tags.push(item.category);
      }
      const authorElement = await page.$(
        "ul.yt-articlepage__page-title-container-author"
      );
      const authorText = authorElement
        ? await authorElement.evaluate((el) => el.textContent)
        : "";
      const author =
        authorText && typeof authorText === "string"
          ? authorText.trim().slice(0, 3) === "By "
            ? authorText
                .trim()
                .slice(3)
                .replace(item.date, "")
                .trim()
                .replace("\n            \n              ", " - ")
            : authorText
                .replace(item.date, "")
                .trim()
                .replace("\n            \n              ", " - ")
          : "";
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
        announcements.push(newAnnouncement);
      }
    } catch {
      console.log("Error at i=" + i);
    }
  }
  await browser.close();
  return announcements;
};

const init = async () => {
  // await instagram();
  // await facebook();
  // await stackoverflow();
  // await pinterest();
  // await youtube();
  // await linkedin();
  // await snapchat();
  // await twitter();
  // await whatsapp();
  // await reddit();
  // await tiktok();
  // const facebookData = await read("./output/facebook-20230304.json")
  //   .then((res) => res.toString())
  //   .then((res) => JSON.parse(res));
  // const instagramData = await read("./output/instagram-20230304.json")
  //   .then((res) => res.toString())
  //   .then((res) => JSON.parse(res));
  // const linkedinData = await read("./output/linkedin-20230304.json")
  //   .then((res) => res.toString())
  //   .then((res) => JSON.parse(res));
  // const pinterestData = await read("./output/pinterest-20230304.json")
  //   .then((res) => res.toString())
  //   .then((res) => JSON.parse(res));
  // const redditData = await read("./output/reddit-20230304.json")
  //   .then((res) => res.toString())
  //   .then((res) => JSON.parse(res));
  // const snapchatData = await read("./output/snapchat-20230304.json")
  //   .then((res) => res.toString())
  //   .then((res) => JSON.parse(res));
  // const stackoverflowData = await read("./output/stackoverflow-20230304.json")
  //   .then((res) => res.toString())
  //   .then((res) => JSON.parse(res));
  // const tiktokData = await read("./output/tiktok-20230304.json")
  //   .then((res) => res.toString())
  //   .then((res) => JSON.parse(res));
  // const twitterData = await read("./output/twitter-20230304.json")
  //   .then((res) => res.toString())
  //   .then((res) => JSON.parse(res));
  // const whatsappData = await read("./output/whatsapp-20230304.json")
  //   .then((res) => res.toString())
  //   .then((res) => JSON.parse(res));
  // const youtubeData = await read("./output/youtube-20230304.json")
  //   .then((res) => res.toString())
  //   .then((res) => JSON.parse(res));

  // const _facebookData = await read("./output/_facebook.json")
  //   .then((res) => res.toString())
  //   .then((res) => JSON.parse(res));
  // const _instagramData = await read("./output/_instagram.json")
  //   .then((res) => res.toString())
  //   .then((res) => JSON.parse(res));
  // const _linkedinData = await read("./output/_linkedin.json")
  //   .then((res) => res.toString())
  //   .then((res) => JSON.parse(res));
  // const _pinterestData = await read("./output/_pinterest.json")
  //   .then((res) => res.toString())
  //   .then((res) => JSON.parse(res));
  // const _redditData = await read("./output/_reddit.json")
  //   .then((res) => res.toString())
  //   .then((res) => JSON.parse(res));
  // const _snapchatData = await read("./output/_snapchat.json")
  //   .then((res) => res.toString())
  //   .then((res) => JSON.parse(res));
  // const _stackoverflowData = await read("./output/_stackoverflow.json")
  //   .then((res) => res.toString())
  //   .then((res) => JSON.parse(res));
  // const _tiktokData = await read("./output/_tiktok.json")
  //   .then((res) => res.toString())
  //   .then((res) => JSON.parse(res));
  // const _twitterData = await read("./output/_twitter.json")
  //   .then((res) => res.toString())
  //   .then((res) => JSON.parse(res));
  // const _whatsappData = await read("./output/_whatsapp.json")
  //   .then((res) => res.toString())
  //   .then((res) => JSON.parse(res));
  // const _youtubeData = await read("./output/_youtube.json")
  //   .then((res) => res.toString())
  //   .then((res) => JSON.parse(res));

  const _data = await read("./output/_data.json")
    .then((res) => res.toString())
    .then((res) => JSON.parse(res))
    .then((res) => {
      return res.map((item) => {
        return [
          item.platform,
          item.date,
          item.title,
          item.description,
          item.tags.join(","),
          item.author,
          item.url,
        ];
      });
    });
  _data.splice(0, 0, [
    "Platform",
    "Date",
    "Title",
    "Description",
    "Tags",
    "Author",
    "URL",
  ]);
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.aoa_to_sheet(_data);
  XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
  XLSX.writeFile(workbook, "./output/data.xlsx");

  // const _youtube = await read("./output/_youtube.json")
  //   .then((res) => res.toString())
  //   .then((res) => JSON.parse(res));
  // const youtubeMissing = youtubeData
  //   .filter((item1) => {
  //     const found = _youtube.find((item2) => {
  //       return item2.url === item1.link;
  //     });
  //     return found ? false : true;
  //   })
  //   .map((item) => {
  //     return { url: item.link, date: item.date, title: item.title };
  //   });
  // console.log(youtubeMissing);
  // console.log(youtubeMissing.length);

  // const processedFacebookData = await processFacebookData(facebookData);
  // const facebookFilePath = "./output/_facebook-" + Date.now() + ".json";
  // const facebookFileData = JSON.stringify(processedFacebookData);
  // await write(facebookFilePath, facebookFileData);

  // const processedInstagramData = await processInstagramData(
  //   instagramData.slice(0, 50)
  // );
  // const instagramFilePath = "./output/_instagram-" + Date.now() + ".json";
  // const instagramFileData = JSON.stringify(processedInstagramData);
  // await write(instagramFilePath, instagramFileData);

  // const processedLinkedinData = await processLinkedinData(linkedinData);
  // const linkedinFilePath = "./output/_linkedin-" + Date.now() + ".json";
  // const linkedinFileData = JSON.stringify(processedLinkedinData);
  // await write(linkedinFilePath, linkedinFileData);

  // const processedPinterestData = await processPinterestData(pinterestData);
  // const pinterestFilePath = "./output/_pinterest" + Date.now() + ".json";
  // const pinterestFileData = JSON.stringify(processedPinterestData);
  // await write(pinterestFilePath, pinterestFileData);

  // const processedRedditData = await processRedditData(redditData);
  // const redditFilePath = "./output/_reddit" + Date.now() + ".json";
  // const redditFileData = JSON.stringify(processedRedditData);
  // await write(redditFilePath, redditFileData);

  // const processedSnapchatData = await processSnapchatData(snapchatData);
  // const snapchatFilePath = "./output/_snapchat" + Date.now() + ".json";
  // const snapchatFileData = JSON.stringify(processedSnapchatData);
  // await write(snapchatFilePath, snapchatFileData);

  // const processedStackoverflowData = await processStackoverflowData(
  //   stackoverflowData
  // );
  // const stackoverflowFilePath = "./output/_stackoverflow" + Date.now() + ".json";
  // const stackoverflowFileData = JSON.stringify(processedStackoverflowData);
  // await write(stackoverflowFilePath, stackoverflowFileData);

  // const processedTiktokData = await processTiktokData(tiktokData);
  // const tiktokFilePath = "./output/_tiktok" + Date.now() + ".json";
  // const tiktokFileData = JSON.stringify(processedTiktokData);
  // await write(tiktokFilePath, tiktokFileData);

  // const processedTwitterData = await processTwitterData(twitterData);
  // const twitterFilePath = "./output/_twitter" + Date.now() + ".json";
  // const twitterFileData = JSON.stringify(processedTwitterData);
  // await write(twitterFilePath, twitterFileData);

  // const processedWhatsappData = await processWhatsappData(whatsappData);
  // const whatsappFilePath = "./output/_whatsapp" + Date.now() + ".json";
  // const whatsappFileData = JSON.stringify(processedWhatsappData);
  // await write(whatsappFilePath, whatsappFileData);

  // const processedYoutubeData = await processYoutubeData(youtubeData);
  // const youtubeFilePath = "./output/_youtube" + Date.now() + ".json";
  // const youtubeFileData = JSON.stringify(processedYoutubeData);
  // await write(youtubeFilePath, youtubeFileData);

  process.exit();
};

init();

// Quora, Medium, Hike, Viber, Line, Tumblr, Planoly,
