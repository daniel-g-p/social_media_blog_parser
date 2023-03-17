import read from "./utilities/read.js";
import write from "./utilities/write.js";

const init = async () => {
  const input = await read("./output/05-data-alphanumeric.json")
    .then((res) => JSON.parse(res))
    .catch((error) => {
      console.log(error);
      return [];
    });
  console.log(input.length);
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
