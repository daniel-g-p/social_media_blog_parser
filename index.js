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
  const browser = await puppeteer(false);
  const page = await browser.newPage();
  const announcements = [];
  const n = items.length;
  for (let i = 0; i < n; i++) {
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
      const tag = tagText && typeof tagText === "string" ? tagText.trim() : "";
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
  }
  return announcements;
};

const processInstagramData = async (items) => {
  const browser = await puppeteer(false);
  const page = await browser.newPage();
  const announcements = [];
  const n = items.length;
  for (let i = 0; i < n; i++) {
    console.log(`Instagram (${i + 1}/${n})`);
    const item = items[i];
    await page.goto(item.link);
    await wait(2500);
    const dateElement = await page.$("p._a8td._abs4");
    const dateText = dateElement
      ? await dateElement
          .evaluate((el) => el.textContent)
          .then((res) => (res && typeof res === "string" ? res.trim() : ""))
          .catch(() => "")
      : "";
    const dateYear = dateText ? +dateText.split(", ")[1] : null;
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
    const dateDay = dateText ? +dateText.split(" ")[1].split(",")[0] : null;
    const date = new Date(dateYear, dateMonth, dateDay);
    const titleElement = await page.$("h1._a8td._a6sv._a4km");
    const titleText = titleElement
      ? await titleElement.evaluate((el) => el.textContent)
      : "";
    const title =
      titleText && typeof titleText === "string" ? titleText.trim() : "";
    const descriptionElement = await page.$('head meta[name="description"]');
    const descriptionText = descriptionElement
      ? await descriptionElement.evaluate((el) => el.getAttribute("content"))
      : "";
    const description =
      descriptionText && typeof descriptionText === "string"
        ? descriptionText.trim()
        : "";
    const tags = item.hashtags.map((hashtag) => {
      return hashtag.slice(0, 1).toUpperCase() + hashtag.slice(1);
    });
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
    }
  }
  return announcements;
};

const processLinkedinData = async (items) => {
  const browser = await puppeteer(false);
  const page = await browser.newPage();
  const announcements = [];
  const n = items.length;
  for (let i = 0; i < n; i++) {
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
    const tags = item.categories.map((item) => {
      return item.slice(0, 1).toUpperCase() + item.slice(1);
    });
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
  }
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
  const facebookData = await read("./output/facebook-20230304.json")
    .then((res) => res.toString())
    .then((res) => JSON.parse(res));
  const instagramData = await read("./output/instagram-20230304.json")
    .then((res) => res.toString())
    .then((res) => JSON.parse(res));
  const linkedinData = await read("./output/linkedin-20230304.json")
    .then((res) => res.toString())
    .then((res) => JSON.parse(res));
  const pinterestData = await read("./output/pinterest-20230304.json")
    .then((res) => res.toString())
    .then((res) => JSON.parse(res));
  const redditData = await read("./output/reddit-20230304.json")
    .then((res) => res.toString())
    .then((res) => JSON.parse(res));
  const snapchatData = await read("./output/snapchat-20230304.json")
    .then((res) => res.toString())
    .then((res) => JSON.parse(res));
  const stackoverflowData = await read("./output/stackoverflow-20230305.json")
    .then((res) => res.toString())
    .then((res) => JSON.parse(res));
  const tiktokData = await read("./output/tiktok-20230304.json")
    .then((res) => res.toString())
    .then((res) => JSON.parse(res));
  const twitterData = await read("./output/twitter-20230304.json")
    .then((res) => res.toString())
    .then((res) => JSON.parse(res));
  const whatsappData = await read("./output/whatsapp-20230304.json")
    .then((res) => res.toString())
    .then((res) => JSON.parse(res));
  const youtubeData = await read("./output/youtube-20230304.json")
    .then((res) => res.toString())
    .then((res) => JSON.parse(res));

  // const processedFacebookData = await processFacebookData(facebookData);
  // const facebookFilePath = "./output/facebook-" + Date.now() + ".json";
  // const facebookFileData = JSON.stringify(processedFacebookData);
  // await write(facebookFilePath, facebookFileData);

  const processedInstagramData = await processInstagramData(instagramData);
  const instagramFilePath = "./output/instagram-" + Date.now() + ".json";
  const instagramFileData = JSON.stringify(processedInstagramData);
  await write(instagramFilePath, instagramFileData);

  // const processedLinkedinData = await processLinkedinData(linkedinData);
  // const linkedinFilePath = "./output/linkedin-" + Date.now() + ".json";
  // const linkedinFileData = JSON.stringify(processedLinkedinData);
  // await write(linkedinFilePath, linkedinFileData);

  process.exit();
};

init();

// Quora, Medium, Hike, Viber, Line, Tumblr, Planoly,
