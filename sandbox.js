import read from "./utilities/read.js";
import write from "./utilities/write.js";

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
  await write(
    "./output/08-data-analysis.xlsx",
    JSON.stringify([columns, ...rows])
  );
};

init();

// - Within-platform Jaccard
// - Within-platform Jaccard grouped by platform (11)
// - Within-platform Jaccard grouped by year (12)
// - Within-platform Jaccard grouped by platform (11) and year (12)
// - Between-platform Jaccard
// - Between-platform Jaccard grouped by platform (11)
// - Between-platform Jaccard grouped by year (12)
// - Between-platform Jaccard grouped by platform (11) and year (12)
// - Platform-to-platform Jaccard
// - PLatform-to-platform Jaccard grouped by year
