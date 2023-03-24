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

const filterProductNewsItems = async () => {
  const input = await read("./output/05-data-alphanumeric.json")
    .then((res) => {
      return JSON.parse(res);
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
  const relevantCategories = {
    Facebook: "Product News",
    Instagram: "Product",
    LinkedIn: "Product News",
    Pinterest: "Product",
    Reddit: "Product & Design",
    TikTok: "Product",
    Twitter: "Product",
    WhatsApp: "",
    YouTube: "Products & Features",
  };
  const output = input.filter((item) => {
    const { platform, tags } = item;
    const relevantCategory = relevantCategories[platform];
    return relevantCategory === "" || tags.includes(relevantCategory)
      ? true
      : false;
  });
  const outputFileName = "./output/06-data-filtered.json";
  const outputFileData = JSON.stringify(output);
  await write(outputFileName, outputFileData);
};

const computeTextSimilarities = async () => {
  const input = await read("./output/06-data-filtered.json")
    .then((res) => {
      return JSON.parse(res);
    })
    .then((res) => {
      return res.map((item) => {
        item.text = item.text.split(" ").filter((word) => word.length > 3);
        return item;
      });
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

  console.log(combinations.length);

  const batchSize = 100000;
  const nBatches = Math.ceil(combinations.length / batchSize);
  let batchIndex = 0;

  while (batchIndex < nBatches) {
    const output = [];
    const startIndex = batchIndex * batchSize;
    const endIndex = startIndex + batchSize;
    const batch = combinations.slice(startIndex, endIndex);
    const nCombinations = batch.length;
    for (let i = 0; i < nCombinations; i++) {
      console.log(
        `Batch ${batchIndex + 1}/${nBatches} - Combination ${
          i + 1
        }/${nCombinations}`
      );
      const combination = batch[i];
      const id1 = combination[0];
      const id2 = combination[1];
      const item1 = input.find((item) => item.id === id1);
      const item2 = input.find((item) => item.id === id2);
      const words1 = item1.text;
      const words2 = item2.text;
      const length1 = words1.length;
      const length2 = words2.length;
      const union = length1 + length2;
      const intersection =
        (words1.filter((word) => words2.includes(word)).length +
          words2.filter((word) => words1.includes(word)).length) /
        2;
      const jaccard = intersection / union;
      const outputItem = {
        id1,
        id2,
        platform1: item1.platform,
        platform2: item2.platform,
        date1: item1.date,
        date2: item2.date,
        tags1: item1.tags,
        tags2: item2.tags,
        jaccard,
      };
      output.push(outputItem);
    }
    await write(
      "./output/07-data-similarities-batch-" + (batchIndex + 1) + ".json",
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

const analyzeTextSimilarities = async () => {
  // 1. Read computed Jaccard similarities data
  const data = [];
  for (let i = 1; i <= 10; i++) {
    const fileName = "./output/07-data-similarities-" + i + ".json";
    const fileData = await read(fileName)
      .then((res) => JSON.parse(res))
      .catch((error) => {
        console.log(error);
        return [];
      });
    data.push(...fileData);
  }
  console.log(data.length + " data points loaded...");

  // 2. Format data to suit analysis operations
  const input = data
    .filter((item) => item.platform1 !== item.platform2)
    .map((item) => {
      item.ids = [item.id1, item.id2];
      item.platforms = [item.platform1, item.platform2];
      item.dates = [new Date(item.date1), new Date(item.date2)];
      delete item.id1;
      delete item.id2;
      delete item.platform1;
      delete item.platform2;
      delete item.date1;
      delete item.date2;
      delete item.tags1;
      delete item.tags2;
      return item;
    })
    .map((item) => {
      const index =
        item.dates[0] > item.dates[1]
          ? 0
          : item.dates[0] < item.dates[1]
          ? 1
          : -1;
      return {
        ids: item.ids,
        platform:
          index === 0
            ? [item.platforms[0]]
            : index === 1
            ? [item.platforms[1]]
            : item.platforms,
        basePlatform:
          index === 0
            ? [item.platforms[1]]
            : index === 1
            ? [item.platforms[0]]
            : item.platforms,
        date: index === 0 ? item.dates[0] : item.dates[1],
        baseDate: index === 0 ? item.dates[1] : item.dates[0],
        jaccard: item.jaccard,
      };
    });

  // 3. Define segmentation criteria for analysis
  const platforms = [
    null,
    "Facebook",
    "Instagram",
    "LinkedIn",
    "Pinterest",
    "Reddit",
    "TikTok",
    "Twitter",
    "WhatsApp",
    "YouTube",
  ];
  const years = [
    null,
    2023,
    2022,
    2021,
    2020,
    2019,
    2018,
    2017,
    2016,
    2015,
    2014,
    2013,
    2012,
    2011,
    2010,
    2009,
    2008,
    2007,
    2006,
    2005,
    2004,
    2003,
  ];
  const months = [null, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const timeframes = [null, 365, 91, 30];

  // 4. Create output target object
  let output = [];

  // 5. Loop through segmentation criteria combinations
  for (const platform of platforms) {
    for (const basePlatform of platforms) {
      for (const year of years) {
        for (const month of months) {
          if (month === null || year !== null) {
            for (const timeframe of timeframes) {
              // 5.1 Extract Jaccard Index values from data
              const values = input
                .filter((item) => {
                  return platform === null || item.platform.includes(platform)
                    ? true
                    : false;
                })
                .filter((item) => {
                  return basePlatform === null ||
                    item.basePlatform.includes(basePlatform)
                    ? true
                    : false;
                })
                .filter((item) => {
                  return year === null || item.date.getFullYear() === year
                    ? true
                    : false;
                })
                .filter((item) => {
                  return year === null ||
                    month === null ||
                    item.date.getMonth() === month
                    ? true
                    : false;
                })
                .filter((item) => {
                  return timeframe === null ||
                    item.date.getTime() - item.baseDate.getTime() <
                      timeframe * 24 * 60 * 60 * 1000
                    ? true
                    : false;
                })
                .map((item) => item.jaccard)
                .sort((a, b) => a - b);

              // 5.2 Compute mean
              const mean = values.reduce((result, value, index) => {
                const n = index + 1;
                return (1 / n) * value + ((n - 1) / n) * result;
              }, 0);

              // 5.3 Compute sample size
              const sampleSize = values.length;

              // 5.4 Compute standard deviation
              const standardDeviation = Math.sqrt(
                values.reduce((result, value) => {
                  const meanDeviation = value - mean;
                  return result + meanDeviation * meanDeviation;
                }, 0) /
                  (sampleSize - 1)
              );

              // 5.5 Compute quartiles
              const quartile1 = values[Math.round((1 * sampleSize) / 4) - 1];
              const median = values[Math.round((2 * sampleSize) / 4) - 1];
              const quartile3 = values[Math.round((3 * sampleSize) / 4) - 1];

              // 5.6 Compute histogram
              const minimum = values[0];
              const maximum = values[sampleSize - 1];
              const range = maximum - minimum;
              const numberOfGroups = 10;
              const groupsStep = range / numberOfGroups;
              const histogram = [];
              for (let i = 0; i < numberOfGroups; i++) {
                const groupMaximum = minimum + (i + 1) * groupsStep;
                const groupN = i
                  ? values.filter((value) => value <= groupMaximum).length -
                    histogram.reduce((result, value) => result + value)
                  : values.filter((value) => value <= groupMaximum).length;
                histogram.push(groupN);
              }

              // 5.7 Create output item
              const outputItem = {
                platform: platform === null ? "All" : platform,
                basePlatform: basePlatform === null ? "All" : basePlatform,
                year: year === null ? "All" : year.toString(),
                month:
                  month === null
                    ? "Full Year"
                    : month === 0
                    ? "January"
                    : month === 1
                    ? "February"
                    : month === 2
                    ? "March"
                    : month === 3
                    ? "April"
                    : month === 4
                    ? "May"
                    : month === 5
                    ? "June"
                    : month === 6
                    ? "July"
                    : month === 7
                    ? "August"
                    : month === 8
                    ? "September"
                    : month === 9
                    ? "October"
                    : month === 10
                    ? "November"
                    : month === 11
                    ? "December"
                    : "",
                timeframe:
                  timeframe === 365
                    ? "Yearly"
                    : timeframe === 91
                    ? "Quarterly"
                    : timeframe === 30
                    ? "Monthly"
                    : "All-time",
                mean,
                sampleSize,
                standardDeviation,
                quartile1,
                median,
                quartile3,
                histogram,
              };

              if (outputItem.sampleSize > 0) {
                output.push(outputItem);
              }

              const textUpdate = `Platform: ${outputItem.platform} / Base Platform: ${outputItem.basePlatform} / Date range: ${outputItem.month} ${outputItem.year} / Timeframe: ${outputItem.timeframe}`;
              console.log(textUpdate);
            }
          }
        }
      }
    }
    const filePath = platform
      ? "./output/08-data-analysis-all.json"
      : "./output/08-data-analysis-" + platform.toLowerCase() + ".json";
    const fileData = JSON.stringify(output);
    await write(filePath, fileData);
    output = [];
  }
};

// getPosts();
// getPostsText();
// filterProductNewsItems();
// computeTextSimilarities();
analyzeTextSimilarities();
