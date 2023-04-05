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

// init();

const q1 = async () => {
  const input = await read("./output/08-data-analysis-3.json")
    .then((res) => JSON.parse(res))
    .catch((error) => {
      console.log(error);
      return [];
    });
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
  const filePath = "./output/09-data-insights-1.json";
  const fileData = JSON.stringify(output);
  await write(filePath, fileData);
  const aoaColumns = ["Year", "Jaccard Index"];
  const aoaRows = output.map((item) => [item.year, item.jaccardIndex]);
  const aoa = [aoaColumns, ...aoaRows];
  aoaToXlsx(filePath.replace(".json", ".xlsx"), aoa);
};

const q2 = async () => {
  const input = await read("./output/08-data-analysis-3.json")
    .then((res) => JSON.parse(res))
    .catch((error) => {
      console.log(error);
      return [];
    });
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
  const filePath = "./output/09-data-insights-2.json";
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

const q3 = async () => {
  const input = await read("./output/08-data-analysis-3.json")
    .then((res) => JSON.parse(res))
    .catch((error) => {
      console.log(error);
      return [];
    });
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
  const filePath = "./output/09-data-insights-3.json";
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

const q4 = async () => {
  const input = await read("./output/08-data-analysis-3.json")
    .then((res) => JSON.parse(res))
    .catch((error) => {
      console.log(error);
      return [];
    });
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
  const filePath = "./output/09-data-insights-4.json";
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

const q5 = async () => {
  const input = await read("./output/08-data-analysis-3.json")
    .then((res) => JSON.parse(res))
    .catch((error) => {
      console.log(error);
      return [];
    });
  const timeframes = [
    "91 days",
    "183 days",
    "274 days",
    "365 days",
    "456 days",
    "584 days",
    "639 days",
    "730 days",
  ];
  const output = timeframes.map((timeframe) => {
    return {
      timeframe,
      data: input
        .filter((item) => {
          return item.platform === "All" &&
            item.basePlatform === "All" &&
            item.scope === "Between platform" &&
            item.year !== "All-time" &&
            item.timeframe === timeframe &&
            item.mean !== "N/A"
            ? true
            : false;
        })
        .map((item) => {
          return { year: +item.year, jaccardIndex: item.mean };
        }),
    };
  });
  const filePath = "./output/09-data-insights-5.json";
  const fileData = JSON.stringify(output);
  await write(filePath, fileData);
  const aoaColumns = ["Year", ...output.map((item) => item.timeframe)];
  const aoaRows = [];
  for (let year = 2005; year <= 2023; year++) {
    const aoaRow = [
      year,
      ...output.map((item1) => {
        return item1.data.find((item2) => item2.year === year).jaccardIndex;
      }),
    ];
    aoaRows.push(aoaRow);
  }
  const aoa = [aoaColumns, ...aoaRows];
  aoaToXlsx(filePath.replace(".json", ".xlsx"), aoa);
};

// Q1: Is there a significant increase in text similarity?

// Q2: Which platforms copy the most/least?

// Q3: Which platforms are copied the most/least?

// Q4: Which platforms are closest/furthest from each other?

// Q5: How quickly do platforms react to changes in other platforms?
