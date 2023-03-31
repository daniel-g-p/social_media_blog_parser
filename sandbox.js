import read from "./utilities/read.js";
import write from "./utilities/write.js";

import aoaToXlsx from "./utilities/aoa-to-xlsx.js";

const init = async () => {
  const input = await read("./output/08-data-analysis-2.json")
    .then((res) => JSON.parse(res))
    .catch((error) => {
      console.log(error);
      return [];
    });
  const columns = [
    "Platform",
    "Base Platform",
    "Year",
    "Month",
    "Timeframe",
    "Jaccard Index (Mean)",
    "Jaccard Index (Median)",
    "Jaccard Index (Standard Deviation)",
    "Sample Size",
    "Quartile 1",
    "Quartile 3",
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
      item.year,
      item.month,
      item.timeframe,
      item.mean,
      item.median,
      item.standardDeviation,
      item.sampleSize,
      item.quartile1,
      item.quartile3,
      item.quartile3 - item.quartile1,
      item.histogram[0],
      item.histogram[1],
      item.histogram[2],
      item.histogram[3],
      item.histogram[4],
      item.histogram[5],
      item.histogram[6],
      item.histogram[7],
      item.histogram[8],
      item.histogram[9],
      item.histogram[10],
    ];
  });
  aoaToXlsx("./output/08-data-analysis-2.xlsx", [columns, ...rows]);
};

init();

// Q1: Is there a significant increase in text similarity?

// Q2: Which platforms copy the most/least?

// Q3: Which platforms are copied the most/least?

// Q4: How quickly do platforms react to changes in other platforms?

// Q5: Which platforms are closest/furthest from each other?
