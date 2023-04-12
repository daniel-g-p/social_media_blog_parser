import read from "./utilities/read.js";
import write from "./utilities/write.js";

import anova from "./utilities/anova.js";

import aoaToXlsx from "./utilities/aoa-to-xlsx.js";

const init = async () => {
  const input = await read("./output/08-data-analysis.json")
    .then((res) => JSON.parse(res))
    .catch((error) => {
      console.log(error);
      return [];
    });
  const xlsxFilePath = "./output/08-data-analysis-new.xlsx";
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
  const xlsxRows = input.map((item) => {
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

// init2();
init();
