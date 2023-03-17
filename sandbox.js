import read from "./utilities/read.js";
import write from "./utilities/write.js";

const init = async () => {
  const input = await read("./output/07-data-similarities.json")
    .then((res) => JSON.parse(res))
    .catch((error) => {
      console.log(error);
      return [];
    });

  const batchSize = 100000;
  const nBatches = Math.ceil(input.length / batchSize);
  let batchIndex = 0;

  while (batchIndex < nBatches) {
    const startIndex = batchIndex * batchSize;
    const endIndex = startIndex + batchSize;
    const output = input.slice(startIndex, endIndex);
    await write(
      "./output/07-data-similarities-" + (batchIndex + 1) + ".json",
      JSON.stringify(output)
    )
      .then(() => {
        console.log("Batch " + (batchIndex + 1) + " completed successfully.");
      })
      .catch((error) => {
        console.log("Batch " + (batchIndex + 1) + " failed.");
        console.log(error);
      });
    batchIndex++;
  }
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
