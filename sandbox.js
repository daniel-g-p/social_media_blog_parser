import read from "./utilities/read.js";
import write from "./utilities/write.js";

import aoaToXlsx from "./utilities/aoa-to-xlsx.js";

const init = async () => {
  const input = await read("./output/08-data-analysis-3.json")
    .then((res) => JSON.parse(res))
    .catch((error) => {
      console.log(error);
      return [];
    });
  const columns = [
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
    "Interquartile Range",
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
  const rows = input.map((item) => {
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
      item.quartile3 - item.quartile1,
      ...item.histogram,
    ];
  });
  aoaToXlsx("./output/08-data-analysis-3.xlsx", [columns, ...rows]);
};

const init2 = async () => {
  const input = [];
  for (let i = 1; i <= 10; i++) {
    const inputBatch = await read(
      "./output/07-data-similarities-" + i + ".json"
    )
      .then((res) => JSON.parse(res))
      .catch((error) => {
        console.log(error);
        return [];
      });
    input.push(...inputBatch);
  }
  const output = input
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
      return item.date >= new Date(2015, 0, 1) &&
        item.date < new Date(2020, 0, 1) &&
        item.date.getTime() - item.baseDate.getTime() <
          1000 * 60 * 60 * 24 * 365
        ? true
        : false;
    })
    .filter((item) => {
      return item.platform.length === 1 &&
        item.basePlatform.length === 1 &&
        item.platform[0] !== item.basePlatform[0]
        ? true
        : false;
    })
    .map((item) => item.jaccard)
    .reduce((result, value, index) => {
      const n = index + 1;
      return (1 / n) * value + ((n - 1) / n) * result;
    }, 0);

  console.log(output);
};

const init3 = async () => {
  const input = [];
  for (let i = 1; i <= 10; i++) {
    const inputBatch = await read(
      "./output/07-data-similarities-" + i + ".json"
    )
      .then((res) => JSON.parse(res))
      .catch((error) => {
        console.log(error);
        return [];
      });
    input.push(...inputBatch);
  }
  const inputBetween = input
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
      return item.date >= new Date(2018, 0, 1) &&
        item.date.getTime() - item.baseDate.getTime() <
          1000 * 60 * 60 * 24 * 365
        ? true
        : false;
    })
    .filter((item) => {
      return item.platform.length === 1 &&
        item.basePlatform.length === 1 &&
        item.platform[0] !== item.basePlatform[0]
        ? true
        : false;
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
  const years = [2023, 2022, 2021, 2020, 2019, 2018];
  const output = [];
  for (const year of years) {
    for (const platform of platforms) {
      const items = inputBetween.filter((item) => {
        return item.date.getFullYear() === year;
      });
      const data = {
        incoming: items.filter((item) => item.basePlatform[0] === platform),
        outgoing: items.filter((item) => item.platform[0] === platform),
      };
      for (const type of ["incoming", "outgoing"]) {
        const values = data[type].map((item) => item.jaccard);
        const mean = values.reduce((result, value, index) => {
          const n = index + 1;
          return (1 / n) * value + ((n - 1) / n) * result;
        }, 0);
        data[type] = mean;
      }
      const outputItem = {
        year,
        platform,
        difference: data.incoming - data.outgoing,
      };
      output.push(outputItem);
    }
  }
  const columns = ["", 2018, 2019, 2020, 2021, 2022, 2023];
  const rows = [];
  for (const platform of platforms) {
    const items = output
      .filter((item) => item.platform === platform)
      .sort((a, b) => a.year - b.year)
      .map((item) => item.difference);
    const row = [platform, ...items];
    rows.push(row);
  }
  aoaToXlsx("./output/09-data-insights-3_2.xlsx", [columns, ...rows]);
};

// init2();
init3();
