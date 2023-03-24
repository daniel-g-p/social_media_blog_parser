import read from "./utilities/read.js";
import write from "./utilities/write.js";

const init = async () => {
  const extensions = [
    "all",
    "facebook",
    "instagram",
    "linkedin",
    "pinterest",
    "reddit",
    "tiktok",
    "twitter",
    "whatsapp",
    "youtube",
  ];
  const input = [];
  for (const extension of extensions) {
    const data = await read("./output/08-data-analysis-" + extension + ".json")
      .then((res) => JSON.parse(res))
      .catch((error) => {
        console.log(error);
        return [];
      });
    input.push(...data);
  }
  await write("./output/08-data-analysis.json", JSON.stringify(input));
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
