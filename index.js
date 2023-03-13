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

import read from "./utilities/read.js";
import write from "./utilities/write.js";

const gatherPosts = async () => {
  // // Facebook
  // const facebookItems = await facebook.getItems();
  // const facebookItemsData = await facebook.getItemsData(facebookItems);
  // const facebookFileName = "./output/facebook-" + Date.now() + ".json";
  // const facebookFileData = JSON.stringify(facebookItemsData);
  // await write(facebookFileName, facebookFileData);

  // // Instagram
  // const instagramItems = await instagram.getItems();
  // const instagramItemsData = await instagram.getItemsData(instagramItems);
  // const instagramFileName = "./output/instagram-" + Date.now() + ".json";
  // const instagramFileData = JSON.stringify(instagramItemsData);
  // await write(instagramFileName, instagramFileData);

  // // LinkedIn
  // const linkedinItems = await linkedin.getItems();
  // const linkedinItemsData = await linkedin.getItemsData(linkedinItems);
  // const linkedinFileName = "./output/linkedin-" + Date.now() + ".json";
  // const linkedinFileData = JSON.stringify(linkedinItemsData);
  // await write(linkedinFileName, linkedinFileData);

  // // Pinterest
  // const pinterestItems = await pinterest.getItems();
  // const pinterestItemsData = await pinterest.getItemsData(pinterestItems);
  // const pinterestFileName = "./output/pinterest-" + Date.now() + ".json";
  // const pinterestFileData = JSON.stringify(pinterestItemsData);
  // await write(pinterestFileName, pinterestFileData);

  // // Reddit
  // const redditItems = await reddit.getItems();
  // const redditItemsData = await reddit.getItemsData(redditItems);
  // const redditFileName = "./output/reddit-" + Date.now() + ".json";
  // const redditFileData = JSON.stringify(redditItemsData);
  // await write(redditFileName, redditFileData);

  // // Snapchat
  // const snapchatItems = await snapchat.getItems();
  // const snapchatItemsData = await snapchat.getItemsData(snapchatItems);
  // const snapchatFileName = "./output/snapchat-" + Date.now() + ".json";
  // const snapchatFileData = JSON.stringify(snapchatItemsData);
  // await write(snapchatFileName, snapchatFileData);

  // // Stack Overflow
  // const stackoverflowItems = await stackoverflow.getItems();
  // const stackoverflowItemsData = await stackoverflow.getItemsData(
  //   stackoverflowItems
  // );
  // const stackoverflowFileName =
  //   "./output/stackoverflow-" + Date.now() + ".json";
  // const stackoverflowFileData = JSON.stringify(stackoverflowItemsData);
  // await write(stackoverflowFileName, stackoverflowFileData);

  // // TikTok
  // const tiktokItems = await tiktok.getItems();
  // const tiktokItemsData = await tiktok.getItemsData(tiktokItems);
  // const tiktokFileName = "./output/tiktok-" + Date.now() + ".json";
  // const tiktokFileData = JSON.stringify(tiktokItemsData);
  // await write(tiktokFileName, tiktokFileData);

  // // Twitter
  // const twitterItems = await twitter.getItems();
  // const twitterItemsData = await twitter.getItemsData(twitterItems);
  // const twitterFileName = "./output/twitter-" + Date.now() + ".json";
  // const twitterFileData = JSON.stringify(twitterItemsData);
  // await write(twitterFileName, twitterFileData);

  // // whatsApp
  // const whatsappItems = await whatsapp.getItems();
  // const whatsappItemsData = await whatsapp.getItemsData(whatsappItems);
  // const whatsappFileName = "./output/whatsapp-" + Date.now() + ".json";
  // const whatsappFileData = JSON.stringify(whatsappItemsData);
  // await write(whatsappFileName, whatsappFileData);

  // // YouTube
  // const youtubeItems = await youtube.getItems();
  // const youtubeItemsData = await youtube.getItemsData(youtubeItems);
  // const youtubeFileName = "./output/youtube-" + Date.now() + ".json";
  // const youtubeFileData = JSON.stringify(youtubeItemsData);
  // await write(youtubeFileName, youtubeFileData);

  // // JSON Export
  // const allItemsData = [
  //   ...facebookItemsData,
  //   ...instagramItemsData,
  //   ...pinterestItemsData,
  //   ...redditItemsData,
  //   ...snapchatItemsData,
  //   ...stackoverflowItemsData,
  //   ...tiktokItemsData,
  //   ...twitterItemsData,
  //   ...whatsappItemsData,
  //   ...youtubeItemsData,
  // ].sort((a, b) => b.date - a.date);
  // const allFileName = "./output/_data-" + Date.now() + ".json";
  // const allFileData = JSON.stringify(allItemsData);
  // await write(allFileName, allFileData);

  // // XLSX Export
  // const xlsxData = allItemsData.map((item) => {
  //   return [
  //     item.platform,
  //     new Date(item.date).toISOString().slice(0, 10),
  //     item.title,
  //     item.description,
  //     item.tags.join(", "),
  //     item.author,
  //     item.url,
  //   ];
  // });
  // xlsxData.splice(0, 0, [
  //   "Platform",
  //   "Date",
  //   "Title",
  //   "Description",
  //   "Tags",
  //   "Author",
  //   "URL",
  // ]);
  // const workbook = XLSX.utils.book_new();
  // const worksheet = XLSX.utils.aoa_to_sheet(xlsxData);
  // XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  // XLSX.writeFile(workbook, "./output/_data-" + Date.now() + ".xlsx");

  process.exit();
};

const getPostsText = async () => {
  const all = await read("./output/_data.json")
    .then((res) => JSON.parse(res))
    .catch(() => []);

  // Facebook
  const facebookInput = all.filter((item) => item.platform === "Facebook");
  const facebookOutput = await facebook.getItemsText(facebookInput);
  const facebookFileName = "./output/facebook_text-" + Date.now() + ".json";
  const facebookFileData = JSON.stringify(facebookOutput);
  await write(facebookFileName, facebookFileData);

  // Instagram
  const instagramInput = all.filter((item) => item.platform === "Instagram");
  const instagramOutput = await instagram.getItemsText(instagramInput);
  const instagramFileName = "./output/instagram_text-" + Date.now() + ".json";
  const instagramFileData = JSON.stringify(instagramOutput);
  await write(instagramFileName, instagramFileData);

  // // LinkedIn
  const linkedinInput = all.filter((item) => item.platform === "LinkedIn");
  const linkedinOutput = await linkedin.getItemsText(linkedinInput);
  const linkedinFileName = "./output/linkedin_text-" + Date.now() + ".json";
  const linkedinFileData = JSON.stringify(linkedinOutput);
  await write(linkedinFileName, linkedinFileData);

  // // Pinterest
  const pinterestInput = all.filter((item) => item.platform === "Pinterest");
  const pinterestOutput = await pinterest.getItemsText(pinterestInput);
  const pinterestFileName = "./output/pinterest_text-" + Date.now() + ".json";
  const pinterestFileData = JSON.stringify(pinterestOutput);
  await write(pinterestFileName, pinterestFileData);

  // // Reddit
  const redditInput = all.filter((item) => item.platform === "Reddit");
  const redditOutput = await reddit.getItemsText(redditInput);
  const redditFileName = "./output/reddit_text-" + Date.now() + ".json";
  const redditFileData = JSON.stringify(redditOutput);
  await write(redditFileName, redditFileData);

  // // Snapchat
  const snapchatInput = all.filter((item) => item.platform === "Snapchat");
  const snapchatOutput = await snapchat.getItemsText(snapchatInput);
  const snapchatFileName = "./output/snapchat_text-" + Date.now() + ".json";
  const snapchatFileData = JSON.stringify(snapchatOutput);
  await write(snapchatFileName, snapchatFileData);

  // // Stack Overflow
  const stackInput = all.filter((item) => item.platform === "Stack Overflow");
  const stackOutput = await stackoverflow.getItemsText(stackInput);
  const stackFileName = "./output/stackoverflow_text-" + Date.now() + ".json";
  const stackFileData = JSON.stringify(stackOutput);
  await write(stackFileName, stackFileData);

  // // TikTok
  const tiktokInput = all.filter((item) => item.platform === "TikTok");
  const tiktokOutput = await tiktok.getItemsText(tiktokInput);
  const tiktokFileName = "./output/tiktok_text-" + Date.now() + ".json";
  const tiktokFileData = JSON.stringify(tiktokOutput);
  await write(tiktokFileName, tiktokFileData);

  // // Twitter
  const twitterInput = all.filter((item) => item.platform === "Twitter");
  const twitterOutput = await twitter.getItemsText(twitterInput);
  const twitterFileName = "./output/twitter_text-" + Date.now() + ".json";
  const twitterFileData = JSON.stringify(twitterOutput);
  await write(twitterFileName, twitterFileData);

  // // WhatsApp
  const whatsappInput = all.filter((item) => item.platform === "WhatsApp");
  const whatsappOutput = await whatsapp.getItemsText(whatsappInput);
  const whatsappFileName = "./output/whatsapp_text-" + Date.now() + ".json";
  const whatsappFileData = JSON.stringify(whatsappOutput);
  await write(whatsappFileName, whatsappFileData);

  // // YouTube
  const youtubeInput = all.filter((item) => item.platform === "YouTube");
  const youtubeOutput = await youtube.getItemsText(youtubeInput);
  const youtubeFileName = "./output/youtube_text-" + Date.now() + ".json";
  const youtubeFileData = JSON.stringify(youtubeOutput);
  await write(youtubeFileName, youtubeFileData);

  process.exit();
};

getPostsText();
