import read from "./utilities/read.js";
import write from "./utilities/write.js";

import anova from "./utilities/anova.js";

import aoaToXlsx from "./utilities/aoa-to-xlsx.js";

const init = async () => {
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
  const years = [2018, 2019, 2020, 2021, 2022, 2023];
  const output = [];
  for (const year of years) {
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
    const samples = [];
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
        })
        .filter((item) => {
          return item.basePlatform.includes(platform) ? true : false;
        })
        .map((item) => item.jaccard)
        .sort((a, b) => a - b);
      samples.push(sample);
    }
    const outputItem = anova(population, samples);
    outputItem.year = year;
    output.push(outputItem);
  }
  console.log(output);
};

// init2();
init();
