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
import aoaToXlsx from "./utilities/aoa-to-xlsx.js";
import anova from "./utilities/anova.js";

const getPosts = async () => {
  // Facebook
  const facebookItems = await facebook.getItems();
  const facebookItemsData = await facebook.getItemsData(facebookItems);
  const facebookFileName = "./output/01-data-basic-facebook.json";
  const facebookFileData = JSON.stringify(facebookItemsData);
  await write(facebookFileName, facebookFileData);

  // Instagram
  const instagramItems = await instagram.getItems();
  const instagramItemsData = await instagram.getItemsData(instagramItems);
  const instagramFileName = "./output/01-data-basic-instagram.json";
  const instagramFileData = JSON.stringify(instagramItemsData);
  await write(instagramFileName, instagramFileData);

  // LinkedIn
  const linkedinItems = await linkedin.getItems();
  const linkedinItemsData = await linkedin.getItemsData(linkedinItems);
  const linkedinFileName = "./output/01-data-basic-linkedin.json";
  const linkedinFileData = JSON.stringify(linkedinItemsData);
  await write(linkedinFileName, linkedinFileData);

  // Pinterest
  const pinterestItems = await pinterest.getItems();
  const pinterestItemsData = await pinterest.getItemsData(pinterestItems);
  const pinterestFileName = "./output/01-data-basic-pinterest.json";
  const pinterestFileData = JSON.stringify(pinterestItemsData);
  await write(pinterestFileName, pinterestFileData);

  // Reddit
  const redditItems = await reddit.getItems();
  const redditItemsData = await reddit.getItemsData(redditItems);
  const redditFileName = "./output/01-data-basic-reddit.json";
  const redditFileData = JSON.stringify(redditItemsData);
  await write(redditFileName, redditFileData);

  // Snapchat
  const snapchatItems = await snapchat.getItems();
  const snapchatItemsData = await snapchat.getItemsData(snapchatItems);
  const snapchatFileName = "./output/01-data-basic-snapchat.json";
  const snapchatFileData = JSON.stringify(snapchatItemsData);
  await write(snapchatFileName, snapchatFileData);

  // Stack Overflow
  const stackoverflowItems = await stackoverflow.getItems();
  const stackoverflowItemsData = await stackoverflow.getItemsData(
    stackoverflowItems
  );
  const stackoverflowFileName = "./output/01-data-basic-stackoverflow.json";
  const stackoverflowFileData = JSON.stringify(stackoverflowItemsData);
  await write(stackoverflowFileName, stackoverflowFileData);

  // TikTok
  const tiktokItems = await tiktok.getItems();
  const tiktokItemsData = await tiktok.getItemsData(tiktokItems);
  const tiktokFileName = "./output/01-data-basic-tiktok.json";
  const tiktokFileData = JSON.stringify(tiktokItemsData);
  await write(tiktokFileName, tiktokFileData);

  // Twitter
  const twitterItems = await twitter.getItems();
  const twitterItemsData = await twitter.getItemsData(twitterItems);
  const twitterFileName = "./output/01-data-basic-twitter.json";
  const twitterFileData = JSON.stringify(twitterItemsData);
  await write(twitterFileName, twitterFileData);

  // whatsApp
  const whatsappItems = await whatsapp.getItems();
  const whatsappItemsData = await whatsapp.getItemsData(whatsappItems);
  const whatsappFileName = "./output/01-data-basic-whatsapp.json";
  const whatsappFileData = JSON.stringify(whatsappItemsData);
  await write(whatsappFileName, whatsappFileData);

  // YouTube
  const youtubeItems = await youtube.getItems();
  const youtubeItemsData = await youtube.getItemsData(youtubeItems);
  const youtubeFileName = "./output/01-data-basic-youtube.json";
  const youtubeFileData = JSON.stringify(youtubeItemsData);
  await write(youtubeFileName, youtubeFileData);

  // All
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

  // LinkedIn
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

  // Pinterest
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

  // Reddit
  const redditInput = all.filter((item) => item.platform === "Reddit");
  const redditOutput = await reddit.getItemsText(redditInput).catch((error) => {
    console.log(error);
    return [];
  });
  const redditFileName = "./output/02-data-complete-reddit.json";
  const redditFileData = JSON.stringify(redditOutput);
  await write(redditFileName, redditFileData);

  // Snapchat
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

  // Stack Overflow
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

  // TikTok
  const tiktokInput = all.filter((item) => item.platform === "TikTok");
  const tiktokOutput = await tiktok.getItemsText(tiktokInput).catch((error) => {
    console.log(error);
    return [];
  });
  const tiktokFileName = "./output/02-data-complete-tiktok.json";
  const tiktokFileData = JSON.stringify(tiktokOutput);
  await write(tiktokFileName, tiktokFileData);

  // Twitter
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

  // WhatsApp
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

  // YouTube
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

  // All
  const allFileName = "./output/02-data-complete.json";
  const allFileData = JSON.stringify([
    ...facebookOutput,
    ...instagramOutput,
    ...linkedinOutput,
    ...pinterestOutput,
    ...redditOutput,
    ...stackOutput,
    ...tiktokOutput,
    ...twitterOutput,
    ...whatsappOutput,
    ...youtubeOutput,
  ]);
  await write(allFileName, allFileData);

  process.exit();
};

const formatPosts = async () => {
  const input = await read("./output/02-data-complete.json")
    .then((res) => JSON.parse(res))
    .catch((error) => {
      console.log(error);
      return [];
    });
  const output = input.map((item) => {
    item.text = item.text
      .split("")
      .reduce((text, character) => {
        const asciiCode = character.charCodeAt(0);
        const isAlphanumeric =
          (asciiCode >= 48 && asciiCode <= 57) ||
          (asciiCode >= 65 && asciiCode <= 90) ||
          (asciiCode >= 97 && asciiCode <= 122)
            ? true
            : false;
        text += isAlphanumeric ? character : " ";
        return text;
      })
      .split(" ")
      .map((word) => word.trim())
      .filter((word) => word)
      .join(" ")
      .toLowerCase();
    return item;
  });
  const fileName = "./output/03-data-formatted.json";
  const fileData = JSON.stringify(output);
  await write(fileName, fileData);
};

const filterPosts = async () => {
  const input = await read("./output/03-data-alphanumeric.json")
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
  const outputFileName = "./output/04-data-filtered.json";
  const outputFileData = JSON.stringify(output);
  await write(outputFileName, outputFileData);
};

const computeTextSimilarities = async () => {
  const input = await read("./output/04-data-filtered.json")
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
      const words1 = item1.text.slice(0);
      const words2 = item2.text.slice(0);
      const intersection = [...words1, ...words2].filter((word) => {
        return words1.includes(word) && words2.includes(word);
      }).length;
      const union =
        intersection +
        words1.filter((word) => !words2.includes(word)).length +
        words2.filter((word) => !words1.includes(word)).length;
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
      "./output/05-data-similarities-" + (batchIndex + 1) + ".json",
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
    const fileName = "./output/05-data-similarities-" + i + ".json";
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
  const inputBetween = input.filter((item) => {
    return item.platform.some((platform) => {
      return !item.basePlatform.includes(platform);
    });
  });
  const inputWithin = input.filter((item) => {
    return item.platform.every((platform) => {
      return item.basePlatform.includes(platform);
    });
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
  const timeframes = [null, 91, 183, 274, 365, 456, 584, 639, 730];

  // 4. Create output target object
  const output = [];

  // 5. Loop through segmentation criteria combinations (between platforms)
  for (const platform of platforms) {
    for (const basePlatform of platforms) {
      for (const year of years) {
        for (const timeframe of timeframes) {
          // 5.1 Extract Jaccard Index values from data
          const values = inputBetween
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
            scope: "Between platforms",
            year: year === null ? "All-time" : year.toString(),
            timeframe: timeframe === null ? "All-time" : timeframe + " days",
            mean: typeof mean === "number" && mean ? mean : "N/A",
            sampleSize:
              typeof sampleSize === "number" && sampleSize ? sampleSize : "N/A",
            standardDeviation:
              typeof standardDeviation === "number" && standardDeviation
                ? standardDeviation
                : "N/A",
            quartile1:
              typeof quartile1 === "number" && quartile1 ? quartile1 : "N/A",
            median: typeof median === "number" && median ? median : "N/A",
            quartile3:
              typeof quartile3 === "number" && quartile3 ? quartile3 : "N/A",
            histogram: Array.isArray(histogram) ? histogram : [],
          };

          // if (outputItem.sampleSize > 0) {
          output.push(outputItem);
          // }

          const textUpdate = `Platform: ${outputItem.platform} / Base Platform: ${outputItem.basePlatform} / Date range: ${outputItem.year} / Timeframe: ${outputItem.timeframe}`;
          console.log(textUpdate);
        }
      }
    }
  }

  // 6. Loop through segmentation criteria combinations (within platforms)
  for (const platform of platforms) {
    for (const year of years) {
      for (const timeframe of timeframes) {
        // 6.1 Extract Jaccard Index values from data
        const values = inputWithin
          .filter((item) => {
            return platform === null || item.platform.includes(platform)
              ? true
              : false;
          })
          .filter((item) => {
            return year === null || item.date.getFullYear() === year
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

        // 6.2 Compute mean
        const mean = values.reduce((result, value, index) => {
          const n = index + 1;
          return (1 / n) * value + ((n - 1) / n) * result;
        }, 0);

        // 6.3 Compute sample size
        const sampleSize = values.length;

        // 6.4 Compute standard deviation
        const standardDeviation = Math.sqrt(
          values.reduce((result, value) => {
            const meanDeviation = value - mean;
            return result + meanDeviation * meanDeviation;
          }, 0) /
            (sampleSize - 1)
        );

        // 6.5 Compute quartiles
        const quartile1 = values[Math.round((1 * sampleSize) / 4) - 1];
        const median = values[Math.round((2 * sampleSize) / 4) - 1];
        const quartile3 = values[Math.round((3 * sampleSize) / 4) - 1];

        // 6.6 Compute histogram
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

        // 6.7 Create output item
        const outputItem = {
          platform: platform === null ? "All" : platform,
          basePlatform: platform === null ? "All" : platform,
          scope: "Within platform",
          year: year === null ? "All-time" : year.toString(),
          timeframe: timeframe === null ? "All-time" : timeframe + " days",
          mean: typeof mean === "number" && mean ? mean : "N/A",
          sampleSize:
            typeof sampleSize === "number" && sampleSize ? sampleSize : "N/A",
          standardDeviation:
            typeof standardDeviation === "number" && standardDeviation
              ? standardDeviation
              : "N/A",
          quartile1:
            typeof quartile1 === "number" && quartile1 ? quartile1 : "N/A",
          median: typeof median === "number" && median ? median : "N/A",
          quartile3:
            typeof quartile3 === "number" && quartile3 ? quartile3 : "N/A",
          histogram: Array.isArray(histogram) ? histogram : [],
        };

        // if (outputItem.sampleSize > 0) {
        output.push(outputItem);
        // }

        const textUpdate = `Platform: ${outputItem.platform} / Base Platform: ${outputItem.basePlatform} / Date range: ${outputItem.year} / Timeframe: ${outputItem.timeframe}`;
        console.log(textUpdate);
      }
    }
  }

  // 7. Export final data as JSON
  const filePath = "./output/06-data-analysis.json";
  const fileData = JSON.stringify(output);
  await write(filePath, fileData);

  // 8. Export final data as XLSX
  const xlsxFilePath = "./output/06-data-analysis.xlsx";
  const xlsxColumns = [
    "Platform",
    "Base Platform",
    "Scope",
    "Year",
    "Timeframe",
    "Mean",
    "Standard Deviation",
    "Median",
    "Sample Size",
    "1st Quartile",
    "3rd Quartile",
    "Histogram (Group 1)",
    "Histogram (Group 2)",
    "Histogram (Group 3)",
    "Histogram (Group 4)",
    "Histogram (Group 5)",
    "Histogram (Group 6)",
    "Histogram (Group 7)",
    "Histogram (Group 8)",
    "Histogram (Group 9)",
    "Histogram (Group 10)",
  ];
  const xlsxRows = output.map((item) => {
    return [
      item.platform,
      item.basePlatform,
      item.scope,
      item.year,
      item.timeframe,
      item.mean,
      item.standardDeviation,
      item.median,
      item.sampleSize,
      item.quartile1,
      item.quartile3,
      ...item.histogram,
    ];
  });
  const xlsxData = [xlsxColumns, ...xlsxRows];
  aoaToXlsx(xlsxFilePath, xlsxData);
};

const generateInsights = async () => {
  // 1. Import Jaccard Index data points for all post comparisons
  const input = await read("./output/06-data-analysis.json")
    .then((res) => JSON.parse(res))
    .catch((error) => {
      console.log(error);
      return [];
    });

  // 2. Generate data for research question 1
  const q1 = async () => {
    const output = input
      .filter((item) => {
        return item.platform === "All" &&
          item.basePlatform === "All" &&
          item.scope === "Between platform" &&
          item.year !== "All-time" &&
          item.timeframe === "365 days"
          ? true
          : false;
      })
      .map((item) => {
        return { year: item.year, jaccardIndex: item.mean };
      })
      .sort((a, b) => a.year - b.year);
    const filePath = "./output/07-data-insights-q1.json";
    const fileData = JSON.stringify(output);
    await write(filePath, fileData);
    const aoaColumns = ["Year", "Jaccard Index"];
    const aoaRows = output.map((item) => [item.year, item.jaccardIndex]);
    const aoa = [aoaColumns, ...aoaRows];
    aoaToXlsx(filePath.replace(".json", ".xlsx"), aoa);
  };

  // 3. Generate data for research question 2
  const q2 = async () => {
    const yearGroups = [
      [2005, 2009],
      [2010, 2014],
      [2015, 2019],
      [2020, 2023],
      [2005, 2023],
    ];
    const platforms = [
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
    const output = yearGroups.map((yearGroup) => {
      return {
        years: yearGroup,
        data: platforms.map((platform) => {
          return {
            platform,
            jaccardIndex: input
              .filter((item) => {
                return item.platform === "All" &&
                  item.basePlatform === platform &&
                  item.scope === "Between platform" &&
                  item.year >= yearGroup[0] &&
                  item.year <= yearGroup[1] &&
                  item.timeframe === "365 days" &&
                  item.mean !== "N/A"
                  ? true
                  : false;
              })
              .map((item) => item.mean)
              .reduce((result, value, index) => {
                const n = index + 1;
                return (1 / n) * value + ((n - 1) / n) * result;
              }, 0),
          };
        }),
      };
    });
    const filePath = "./output/07-data-insights-q2.json";
    const fileData = JSON.stringify(output);
    await write(filePath, fileData);
    const aoaColumns = [
      "Platform",
      ...output.map((item) => item.years[0] + "-" + item.years[1]),
    ];
    const aoaRows = platforms.map((platform) => {
      return [
        platform,
        ...output.map((item1) => {
          return item1.data.find((item2) => {
            return item2.platform === platform;
          }).jaccardIndex;
        }),
      ];
    });
    const aoa = [aoaColumns, ...aoaRows];
    aoaToXlsx(filePath.replace(".json", ".xlsx"), aoa);
  };

  // 4. Generate data for research question 3
  const q3 = async () => {
    const yearGroups = [
      [2005, 2009],
      [2010, 2014],
      [2015, 2019],
      [2020, 2023],
      [2005, 2023],
    ];
    const platforms = [
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
    const output = yearGroups.map((yearGroup) => {
      return {
        years: yearGroup,
        data: platforms.map((platform) => {
          return {
            platform,
            jaccardIndex: input
              .filter((item) => {
                return item.platform === platform &&
                  item.basePlatform === "All" &&
                  item.scope === "Between platform" &&
                  item.year >= yearGroup[0] &&
                  item.year <= yearGroup[1] &&
                  item.timeframe === "365 days" &&
                  item.mean !== "N/A"
                  ? true
                  : false;
              })
              .map((item) => item.mean)
              .reduce((result, value, index) => {
                const n = index + 1;
                return (1 / n) * value + ((n - 1) / n) * result;
              }, 0),
          };
        }),
      };
    });
    const filePath = "./output/07-data-insights-q3.json";
    const fileData = JSON.stringify(output);
    await write(filePath, fileData);
    const aoaColumns = [
      "Platform",
      ...output.map((item) => item.years[0] + "-" + item.years[1]),
    ];
    const aoaRows = platforms.map((platform) => {
      return [
        platform,
        ...output.map((item1) => {
          return item1.data.find((item2) => {
            return item2.platform === platform;
          }).jaccardIndex;
        }),
      ];
    });
    const aoa = [aoaColumns, ...aoaRows];
    aoaToXlsx(filePath.replace(".json", ".xlsx"), aoa);
  };

  // 5. Generate data for research question 4
  const q4 = async () => {
    const yearGroups = [
      [2005, 2009],
      [2010, 2014],
      [2015, 2019],
      [2020, 2023],
      [2005, 2023],
    ];
    const platforms = [
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
    const output = yearGroups.map((yearGroup) => {
      return {
        years: yearGroup,
        data: platforms
          .map((platform) => {
            return platforms.map((basePlatform) => {
              return { platform, basePlatform };
            });
          })
          .flat()
          .filter((combination) => {
            return combination.platform !== combination.basePlatform;
          })
          .map((combination) => {
            return {
              platform: combination.platform,
              basePlatform: combination.basePlatform,
              jaccardIndex: input
                .filter((item) => {
                  return item.platform === combination.platform &&
                    item.basePlatform === combination.basePlatform &&
                    item.scope === "Between platform" &&
                    item.year >= yearGroup[0] &&
                    item.year <= yearGroup[1] &&
                    item.timeframe === "365 days" &&
                    item.mean !== "N/A"
                    ? true
                    : false;
                })
                .map((item) => item.mean)
                .reduce((result, value, index) => {
                  const n = index + 1;
                  return (1 / n) * value + ((n - 1) / n) * result;
                }, 0),
            };
          })
          .sort((a, b) => b.jaccardIndex - a.jaccardIndex),
      };
    });
    const filePath = "./output/07-data-insights-q4.json";
    const fileData = JSON.stringify(output);
    await write(filePath, fileData);
    const aoaColumns = ["Years", "Platform", "Base Platform", "Jaccard Index"];
    const aoaRows = output
      .map((item1) => {
        return item1.data.map((item2) => {
          return [
            item1.years[0] + "-" + item1.years[1],
            item2.platform,
            item2.basePlatform,
            item2.jaccardIndex,
          ];
        });
      })
      .flat();
    const aoa = [aoaColumns, ...aoaRows];
    aoaToXlsx(filePath.replace(".json", ".xlsx"), aoa);
  };

  q1();
  q2();
  q3();
  q4();
};

const testSignificance = async () => {
  const data = [];
  for (let i = 1; i <= 10; i++) {
    const batch = await read("./output/07-data-similarities-" + i + ".json")
      .then((res) => JSON.parse(res))
      .catch((error) => {
        console.log(error);
        return [];
      });
    data.push(...batch);
  }
  const input = data
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
    })
    .filter((item) => {
      return item.platform.some((platform) => {
        return !item.basePlatform.includes(platform);
      });
    });
  const platforms = [
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
    2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014,
    2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023,
  ];

  const outputQ2 = [];
  const outputQ3 = [];
  for (const year of years) {
    console.log(
      "Testing significance of Jaccard Index differences between platforms for " +
        year +
        "..."
    );
    const population = input
      .filter((item) => {
        return item.date.getFullYear() === year ? true : false;
      })
      .filter((item) => {
        return item.date.getTime() - item.baseDate.getTime() <
          365 * 24 * 60 * 60 * 1000
          ? true
          : false;
      })
      .map((item) => item.jaccard)
      .sort((a, b) => a - b);
    const samplesQ2 = [];
    const samplesQ3 = [];
    for (const platform of platforms) {
      const sample = input
        .filter((item) => {
          return item.date.getFullYear() === year ? true : false;
        })
        .filter((item) => {
          return item.date.getTime() - item.baseDate.getTime() <
            365 * 24 * 60 * 60 * 1000
            ? true
            : false;
        });
      const sampleQ2 = sample
        .filter((item) => {
          return item.basePlatform.includes(platform) ? true : false;
        })
        .map((item) => item.jaccard)
        .sort((a, b) => a - b);
      const sampleQ3 = sample
        .filter((item) => {
          return item.platform.includes(platform) ? true : false;
        })
        .map((item) => item.jaccard)
        .sort((a, b) => a - b);
      samplesQ2.push(sampleQ2);
      samplesQ3.push(sampleQ3);
    }
    const outputItemQ2 = anova(population, samplesQ2);
    outputItemQ2.year = year;
    outputQ2.push(outputItemQ2);
    const outputItemQ3 = anova(population, samplesQ3);
    outputItemQ3.year = year;
    outputQ3.push(outputItemQ3);
  }
  const filePathQ2 = "./output/10-data-significance-q2.json";
  const fileDataQ2 = JSON.stringify(outputQ2);
  await write(filePathQ2, fileDataQ2);
  const filePathQ3 = "./output/10-data-significance-q3.json";
  const fileDataQ3 = JSON.stringify(outputQ3);
  await write(filePathQ3, fileDataQ3);
  const xlsxColumns = [
    "Treatment SoS",
    "Error SoS",
    "Total SoS",
    "Treatment DF",
    "Error DF",
    "Total DF",
    "Treatment MS",
    "Error MS",
    "F-Value",
  ];
  const xlsxRowsQ2 = outputQ2.map((item) => {
    return [
      item.sumOfSquares,
      item.errorSumOfSquares,
      item.totalSumOfSquares,
      item.degreesOfFreedom,
      item.errorDegreesOfFreedom,
      item.totalDegreesOfFreedom,
      item.meanSquares,
      item.errorMeanSquares,
      item.fStatistic,
    ];
  });
  const xlsxDataQ2 = [xlsxColumns, ...xlsxRowsQ2];
  aoaToXlsx(filePathQ2.replace(".json", ".xlsx"), xlsxDataQ2);
  const xlsxRowsQ3 = outputQ3.map((item) => {
    return [
      item.sumOfSquares,
      item.errorSumOfSquares,
      item.totalSumOfSquares,
      item.degreesOfFreedom,
      item.errorDegreesOfFreedom,
      item.totalDegreesOfFreedom,
      item.meanSquares,
      item.errorMeanSquares,
      item.fStatistic,
    ];
  });
  const xlsxDataQ3 = [xlsxColumns, ...xlsxRowsQ3];
  aoaToXlsx(filePathQ3.replace(".json", ".xlsx"), xlsxDataQ3);
};

testSignificance();

// // 1. UNCOMMENT TO CRAWL ALL NEWSROOMS AND GENERATE A LIST OF POST URLS (2 HOURS)
// getPosts();

// // 2. UNCOMMENT TO SCRAPE ALL URLS GATHERED IN STEP 1 (6 HOURS)
// getPostsText();

// // 3. UNCOMMENT TO ASSIGN AN ID TO ALL POSTS AND LIMIT THEIR CONTENT TO LOWERCASE ALPHANUMERIC CHARACTERS (1 MINUTE)
// getPostsText();

// // 4. UNCOMMENT TO FILTER ALL GATHERED NEWSROOM POSTS BY THE CATGORY "PRODUCT" (1 MINUTE)
// filterPosts();

// // 4. UNCOMMENT TO COMPUTE THE JACCARD INDEX FOR ALL POSSIBLE COMBINATIONS OF TWO POSTS (30 MINUTES)
// computeTextSimilarities();

// // 5. UNCOMMENT TO AGGREGATE THE COMPUTED JACCARD INDEX VALUES BY DIFFERENT SCOPES (ESTIMATED TIME: 1 HOUR)
// analyzeTextSimilarities();

// // 6. UNCOMMENT TO GENERATE EXCEL INSIGHTS FOR THE 5 UNDERLYING QUESTIONS (ESTIMATED TIME: 10 SECONDS)
// generateInsights();
