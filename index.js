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

const getPosts = async () => {
  // Facebook
  const facebookItems = await facebook.getItems();
  const facebookItemsData = await facebook.getItemsData(facebookItems);
  const facebookFileName = "./output/01-data-basic-facebook-.json";
  const facebookFileData = JSON.stringify(facebookItemsData);
  await write(facebookFileName, facebookFileData);

  // // Instagram
  const instagramItems = await instagram.getItems();
  const instagramItemsData = await instagram.getItemsData(instagramItems);
  const instagramFileName = "./output/01-data-basic-instagram-.json";
  const instagramFileData = JSON.stringify(instagramItemsData);
  await write(instagramFileName, instagramFileData);

  // // LinkedIn
  const linkedinItems = await linkedin.getItems();
  const linkedinItemsData = await linkedin.getItemsData(linkedinItems);
  const linkedinFileName = "./output/01-data-basic-linkedin-.json";
  const linkedinFileData = JSON.stringify(linkedinItemsData);
  await write(linkedinFileName, linkedinFileData);

  // // Pinterest
  const pinterestItems = await pinterest.getItems();
  const pinterestItemsData = await pinterest.getItemsData(pinterestItems);
  const pinterestFileName = "./output/01-data-basic-pinterest-.json";
  const pinterestFileData = JSON.stringify(pinterestItemsData);
  await write(pinterestFileName, pinterestFileData);

  // // Reddit
  const redditItems = await reddit.getItems();
  const redditItemsData = await reddit.getItemsData(redditItems);
  const redditFileName = "./output/01-data-basic-reddit-.json";
  const redditFileData = JSON.stringify(redditItemsData);
  await write(redditFileName, redditFileData);

  // // Snapchat
  const snapchatItems = await snapchat.getItems();
  const snapchatItemsData = await snapchat.getItemsData(snapchatItems);
  const snapchatFileName = "./output/01-data-basic-snapchat-.json";
  const snapchatFileData = JSON.stringify(snapchatItemsData);
  await write(snapchatFileName, snapchatFileData);

  // // Stack Overflow
  const stackoverflowItems = await stackoverflow.getItems();
  const stackoverflowItemsData = await stackoverflow.getItemsData(
    stackoverflowItems
  );
  const stackoverflowFileName = "./output/01-data-basic-stackoverflow-.json";
  const stackoverflowFileData = JSON.stringify(stackoverflowItemsData);
  await write(stackoverflowFileName, stackoverflowFileData);

  // // TikTok
  const tiktokItems = await tiktok.getItems();
  const tiktokItemsData = await tiktok.getItemsData(tiktokItems);
  const tiktokFileName = "./output/01-data-basic-tiktok-.json";
  const tiktokFileData = JSON.stringify(tiktokItemsData);
  await write(tiktokFileName, tiktokFileData);

  // // Twitter
  const twitterItems = await twitter.getItems();
  const twitterItemsData = await twitter.getItemsData(twitterItems);
  const twitterFileName = "./output/01-data-basic-twitter-.json";
  const twitterFileData = JSON.stringify(twitterItemsData);
  await write(twitterFileName, twitterFileData);

  // // whatsApp
  const whatsappItems = await whatsapp.getItems();
  const whatsappItemsData = await whatsapp.getItemsData(whatsappItems);
  const whatsappFileName = "./output/01-data-basic-whatsapp-.json";
  const whatsappFileData = JSON.stringify(whatsappItemsData);
  await write(whatsappFileName, whatsappFileData);

  // // YouTube
  const youtubeItems = await youtube.getItems();
  const youtubeItemsData = await youtube.getItemsData(youtubeItems);
  const youtubeFileName = "./output/01-data-basic-youtube-.json";
  const youtubeFileData = JSON.stringify(youtubeItemsData);
  await write(youtubeFileName, youtubeFileData);

  // // JSON Export
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
  const allFileName = "./output/01-data-basic.json";
  const allFileData = JSON.stringify(allItemsData);
  await write(allFileName, allFileData);

  process.exit();
};

const getPostsText = async () => {
  const all = await read("./output/01-data-basic.json")
    .then((res) => JSON.parse(res))
    .catch(() => []);

  // Facebook
  const facebookInput = all.filter((item) => item.platform === "Facebook");
  const facebookOutput = await facebook
    .getItemsText(facebookInput)
    .catch((error) => {
      console.log(error);
      return [];
    });
  const facebookFileName = "./output/02-data-complete-facebook.json";
  const facebookFileData = JSON.stringify(facebookOutput);
  await write(facebookFileName, facebookFileData);

  // Instagram
  const instagramInput = all.filter((item) => item.platform === "Instagram");
  const instagramOutput = await instagram
    .getItemsText(instagramInput)
    .catch((error) => {
      console.log(error);
      return [];
    });
  const instagramFileName = "./output/02-data-complete-instagram.json";
  const instagramFileData = JSON.stringify(instagramOutput);
  await write(instagramFileName, instagramFileData);

  // // LinkedIn
  const linkedinInput = all.filter((item) => item.platform === "LinkedIn");
  const linkedinOutput = await linkedin
    .getItemsText(linkedinInput)
    .catch((error) => {
      console.log(error);
      return [];
    });
  const linkedinFileName = "./output/02-data-complete-linkedin.json";
  const linkedinFileData = JSON.stringify(linkedinOutput);
  await write(linkedinFileName, linkedinFileData);

  // // Pinterest
  const pinterestInput = all.filter((item) => item.platform === "Pinterest");
  const pinterestOutput = await pinterest
    .getItemsText(pinterestInput)
    .catch((error) => {
      console.log(error);
      return [];
    });
  const pinterestFileName = "./output/02-data-complete-pinterest.json";
  const pinterestFileData = JSON.stringify(pinterestOutput);
  await write(pinterestFileName, pinterestFileData);

  // // Reddit
  const redditInput = all.filter((item) => item.platform === "Reddit");
  const redditOutput = await reddit.getItemsText(redditInput).catch((error) => {
    console.log(error);
    return [];
  });
  const redditFileName = "./output/02-data-complete-reddit.json";
  const redditFileData = JSON.stringify(redditOutput);
  await write(redditFileName, redditFileData);

  // // Snapchat
  const snapchatInput = all.filter((item) => item.platform === "Snapchat");
  const snapchatOutput = await snapchat
    .getItemsText(snapchatInput)
    .catch((error) => {
      console.log(error);
      return [];
    });
  const snapchatFileName = "./output/02-data-complete-snapchat.json";
  const snapchatFileData = JSON.stringify(snapchatOutput);
  await write(snapchatFileName, snapchatFileData);

  // // Stack Overflow
  const stackInput = all.filter((item) => item.platform === "Stack Overflow");
  const stackOutput = await stackoverflow
    .getItemsText(stackInput)
    .catch((error) => {
      console.log(error);
      return [];
    });
  const stackFileName = "./output/02-data-complete-stackoverflow.json";
  const stackFileData = JSON.stringify(stackOutput);
  await write(stackFileName, stackFileData);

  // // TikTok
  const tiktokInput = all.filter((item) => item.platform === "TikTok");
  const tiktokOutput = await tiktok.getItemsText(tiktokInput).catch((error) => {
    console.log(error);
    return [];
  });
  const tiktokFileName = "./output/02-data-complete-tiktok.json";
  const tiktokFileData = JSON.stringify(tiktokOutput);
  await write(tiktokFileName, tiktokFileData);

  // // Twitter
  const twitterInput = all.filter((item) => item.platform === "Twitter");
  const twitterOutput = await twitter
    .getItemsText(twitterInput)
    .catch((error) => {
      console.log(error);
      return [];
    });
  const twitterFileName = "./output/02-data-complete-twitter.json";
  const twitterFileData = JSON.stringify(twitterOutput);
  await write(twitterFileName, twitterFileData);

  // // WhatsApp
  const whatsappInput = all.filter((item) => item.platform === "WhatsApp");
  const whatsappOutput = await whatsapp
    .getItemsText(whatsappInput)
    .catch((error) => {
      console.log(error);
      return [];
    });
  const whatsappFileName = "./output/02-data-complete-whatsapp.json";
  const whatsappFileData = JSON.stringify(whatsappOutput);
  await write(whatsappFileName, whatsappFileData);

  // // YouTube
  const youtubeInput = all.filter((item) => item.platform === "YouTube");
  const youtubeOutput = await youtube
    .getItemsText(youtubeInput)
    .catch((error) => {
      console.log(error);
      return [];
    });
  const youtubeFileName = "./output/02-data-complete-youtube.json";
  const youtubeFileData = JSON.stringify(youtubeOutput);
  await write(youtubeFileName, youtubeFileData);

  process.exit();
};

const analyzeTextSimilarities = async () => {
  const input = await read("./output/05-data-alphanumeric.json")
    .then((res) => {
      return JSON.parse(res);
    })
    .catch((error) => {
      console.log(error);
      return [];
    });

  const nItems = input.length;
  const combinations = input.reduce((result, item, index, array) => {
    const id = item.id;
    if (index < nItems - 1) {
      const remainingCombinations = array
        .slice(index + 1)
        .map((remainingItem) => [id, remainingItem.id]);
      result.push(...remainingCombinations);
    }
    return result;
  }, []);

  const batchSize = 200000;
  const nBatches = Math.ceil(combinations.length / batchSize);
  let batchIndex = 5;

  while (batchIndex < nBatches) {
    const output = [];
    const startIndex = batchIndex * batchSize;
    const endIndex = startIndex + batchSize;
    const batch = combinations.slice(startIndex, endIndex);
    const nCombinations = batch.length;
    for (let i = 0; i < nCombinations; i++) {
      console.log(
        "Batch " +
          (batchIndex + 1) +
          "/" +
          nBatches +
          " - Combination " +
          (i + 1) +
          "/" +
          nCombinations
      );
      const combination = batch[i];
      const id1 = combination[0];
      const id2 = combination[1];
      const item1 = input.find((item) => item.id === id1);
      const item2 = input.find((item) => item.id === id2);
      const words1 = item1.text.split(" ").filter((word) => word.length > 3);
      const words2 = item2.text.split(" ").filter((word) => word.length > 3);
      const length1 = words1.length;
      const length2 = words2.length;
      const union = length1 + length2;
      const intersection =
        length1 < length2
          ? words1.filter((word) => words2.includes(word)).length
          : words2.filter((word) => words1.includes(word)).length;
      const jaccard = intersection / union;
      const outputItem = {
        ids: [id1, id2],
        platforms: [item1.platform, item2.platform],
        dates: [item1.date, item2.date],
        tags: [item1.tags, item2.tags],
        titles: [item1.title, item2.title],
        textLengths: [length1, length2],
        jaccardIndex: jaccard,
      };
      output.push(outputItem);
    }
    await write(
      "./output/06-data-similarities-batch-" + (batchIndex + 1) + ".json",
      JSON.stringify(output)
    )
      .then(() => {
        console.log("Batch " + (batchIndex + 1) + " completed successfully.");
      })
      .catch((error) => {
        console.log("Batch " + (batchIndex + 1) + " failed.");
        console.log(error);
      });
    batchIndex++;
  }
};

// gatherPosts();
// getPostsText();
// analyzeTextSimilarities();
