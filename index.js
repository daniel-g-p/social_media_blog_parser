import facebook from "./modules/facebook.js";
import instagram from "./modules/instagram.js";
import stackoverflow from "./modules/stackoverflow.js";
import pinterest from "./modules/pinterest.js";
import youtube from "./modules/youtube.js";
import linkedin from "./modules/linkedin.js";

const init = async () => {
  // await instagram();
  // await facebook();
  // await stackoverflow();
  // await pinterest();
  // await youtube();
  await linkedin();
  // process.exit();
};

init();

const urls = [
  "https://stackoverflow.blog/announcements",
  "https://newsroom.pinterest.com/en",
  "https://blog.youtube/news-and-events",
  "https://news.linkedin.com",
  "https://newsroom.snap.com/news",
  "https://blog.twitter.com",
  "https://blog.whatsapp.com",
  "https://www.redditinc.com/blog",
  "https://newsroom.tiktok.com",
];
