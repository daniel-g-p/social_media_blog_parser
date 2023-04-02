import read from "./utilities/read.js";
import write from "./utilities/write.js";

import aoaToXlsx from "./utilities/aoa-to-xlsx.js";

const init = async () => {
  const input = await read("./output/08-data-analysis.json")
    .then((res) => JSON.parse(res))
    .catch((error) => {
      console.log(error);
      return [];
    });
  const columns = [
    "Platform",
    "Base Platform",
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

init();

// Q1: Is there a significant increase in text similarity?

// Q2: Which platforms copy the most/least?

// Q3: Which platforms are copied the most/least?

// Q4: How quickly do platforms react to changes in other platforms?

// Q5: Which platforms are closest/furthest from each other?
