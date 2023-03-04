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
  await reddit();
  // process.exit();
};

init();

const urls = ["https://www.redditinc.com/blog", "https://newsroom.tiktok.com"];
