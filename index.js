import facebook from "./modules/facebook.js";
import instagram from "./modules/instagram.js";
import linkedin from "./modules/linkedin.js";
import pinterest from "./modules/pinterest.js";
import reddit from "./modules/reddit.js";
import snapchat from "./modules/snapchat.js";
import stackoverflow from "./modules/stackoverflow.js";
import tiktok from "./modules/tiktok.js";
import twitter from "./modules/twitter.js";
import whatsapp from "./modules/whatsapp.js";
import youtube from "./modules/youtube.js";

import write from "./utilities/write.js";

const init = async () => {
  // Facebook
  const facebookItems = await facebook.getItems();
  const facebookItemsData = await facebook.getItemsData(facebookItems);
  const facebookFileName = "./output/facebook-" + Date.now() + ".json";
  const facebookFileData = JSON.stringify(facebookItemsData);
  await write(facebookFileName, facebookFileData);

  // Instagram
  const instagramItems = await instagram.getItems();
  const instagramItemsData = await instagram.getItemsData(instagramItems);
  const instagramFileName = "./output/instagram-" + Date.now() + ".json";
  const instagramFileData = JSON.stringify(instagramItemsData);
  await write(instagramFileName, instagramFileData);

  // LinkedIn
  const linkedinItems = await linkedin.getItems();
  const linkedinItemsData = await linkedin.getItemsData(linkedinItems);
  const linkedinFileName = "./output/linkedin-" + Date.now() + ".json";
  const linkedinFileData = JSON.stringify(linkedinItemsData);
  await write(linkedinFileName, linkedinFileData);

  // Pinterest
  const pinterestItems = await pinterest.getItems();
  const pinterestItemsData = await pinterest.getItemsData(pinterestItems);
  const pinterestFileName = "./output/pinterest-" + Date.now() + ".json";
  const pinterestFileData = JSON.stringify(pinterestItemsData);
  await write(pinterestFileName, pinterestFileData);

  // Reddit
  const redditItems = await reddit.getItems();
  const redditItemsData = await reddit.getItemsData(redditItems);
  const redditFileName = "./output/reddit-" + Date.now() + ".json";
  const redditFileData = JSON.stringify(redditItemsData);
  await write(redditFileName, redditFileData);

  // Snapchat
  const snapchatItems = await snapchat.getItems();
  const snapchatItemsData = await snapchat.getItemsData(snapchatItems);
  const snapchatFileName = "./output/snapchat-" + Date.now() + ".json";
  const snapchatFileData = JSON.stringify(snapchatItemsData);
  await write(snapchatFileName, snapchatFileData);

  // Stack Overflow
  const stackoverflowItems = await stackoverflow.getItems();
  const stackoverflowItemsData = await stackoverflow.getItemsData(
    stackoverflowItems
  );
  const stackoverflowFileName =
    "./output/stackoverflow-" + Date.now() + ".json";
  const stackoverflowFileData = JSON.stringify(stackoverflowItemsData);
  await write(stackoverflowFileName, stackoverflowFileData);

  // TikTok
  const tiktokItems = await tiktok.getItems();
  const tiktokItemsData = await tiktok.getItemsData(tiktokItems);
  const tiktokFileName = "./output/tiktok-" + Date.now() + ".json";
  const tiktokFileData = JSON.stringify(tiktokItemsData);
  await write(tiktokFileName, tiktokFileData);

  // Twitter
  const twitterItems = await twitter.getItems();
  const twitterItemsData = await twitter.getItemsData(twitterItems);
  const twitterFileName = "./output/twitter-" + Date.now() + ".json";
  const twitterFileData = JSON.stringify(twitterItemsData);
  await write(twitterFileName, twitterFileData);

  // whatsApp
  const whatsappItems = await whatsapp.getItems();
  const whatsappItemsData = await whatsapp.getItemsData(whatsappItems);
  const whatsappFileName = "./output/whatsapp-" + Date.now() + ".json";
  const whatsappFileData = JSON.stringify(whatsappItemsData);
  await write(whatsappFileName, whatsappFileData);

  // YouTube
  const youtubeItems = await youtube.getItems();
  const youtubeItemsData = await youtube.getItemsData(youtubeItems);
  const youtubeFileName = "./output/youtube-" + Date.now() + ".json";
  const youtubeFileData = JSON.stringify(youtubeItemsData);
  await write(youtubeFileName, youtubeFileData);

  // JSON Export
  const allItemsData = [
    ...facebookItemsData,
    ...instagramItemsData,
    ...pinterestItemsData,
    ...redditItemsData,
    ...snapchatItemsData,
    ...stackoverflowItemsData,
    ...tiktokItemsData,
    ...twitterItemsData,
    ...whatsappItemsData,
    ...youtubeItemsData,
  ].sort((a, b) => b.date - a.date);
  const allFileName = "./output/_data-" + Date.now() + ".json";
  const allFileData = JSON.stringify(allItemsData);
  await write(allFileName, allFileData);

  // XLSX Export
  const xlsxData = allItemsData.map((item) => {
    return [
      item.platform,
      new Date(item.date).toISOString().slice(0, 10),
      item.title,
      item.description,
      item.tags.join(", "),
      item.author,
      item.url,
    ];
  });
  xlsxData.splice(0, 0, [
    "Platform",
    "Date",
    "Title",
    "Description",
    "Tags",
    "Author",
    "URL",
  ]);
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.aoa_to_sheet(xlsxData);
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  XLSX.writeFile(workbook, "./output/_data-" + Date.now() + ".xlsx");
  process.exit();
};

init();
