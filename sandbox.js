import read from "./utilities/read.js";
import write from "./utilities/write.js";

const init = async () => {
  const input = await read("./output/05-data-alphanumeric.json")
    .then((res) => JSON.parse(res))
    .catch((error) => {
      console.log(error);
      return [];
    });
  const platforms = [
    "Facebook",
    "Instagram",
    "LinkedIn",
    "Pinterest",
    "Reddit",
    "Snapchat",
    "Stack Overflow",
    "TikTok",
    "Twitter",
    "WhatsApp",
    "YouTube",
  ];
  for (const platform of platforms) {
    const items = input.filter((item) => item.platform === platform);
    const categories = items.reduce((result, item) => {
      for (const tag of item.tags) {
        if (!result.includes(tag)) {
          result.push(tag);
        }
      }
      return result;
    }, []);
    console.log({
      platform,
      categories,
    });
  }
  const categories = input.reduce;
};

init();

// - Within-platform Jaccard
// - Within-platform Jaccard grouped by platform (11)
// - Within-platform Jaccard grouped by year (12)
// - Within-platform Jaccard grouped by category (2)
// - Within-platform Jaccard grouped by platform (11) and year (12)
// - Within-platform Jaccard grouped by platform (11) and category (2)
// - Within-platform Jaccard grouped by year (12) and category (2)
// - Within-platform Jaccard grouped by platform (11), year (12), category (2)
// - Between-platform Jaccard
// - Between-platform Jaccard grouped by platform (11)
// - Between-platform Jaccard grouped by year (12)
// - Between-platform Jaccard grouped by category (2)
// - Between-platform Jaccard grouped by platform (11) and year (12)
// - Between-platform Jaccard grouped by platform (11) and category (2)
// - Between-platform Jaccard grouped by year (12) and category (2)
// - Between-platform Jaccard grouped by platform (11), year (12), category (2)
