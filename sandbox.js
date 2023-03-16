import uniqueId from "./utilities/id.js";
import read from "./utilities/read.js";
import write from "./utilities/write.js";

const init = async () => {
  const input = await read("./output/05-data-alphanumeric.json")
    .then((res) => {
      return JSON.parse(res);
    })
    .catch((error) => {
      console.log(error);
      return [];
    });

  const nItems = input.length;
  const combinations = input.reduce((result, item, index, array) => {
    const id = item.id;
    if (index < nItems - 1) {
      const remainingCombinations = array
        .slice(index + 1)
        .map((remainingItem) => [id, remainingItem.id]);
      result.push(...remainingCombinations);
    }
    return result;
  }, []);

  const batchSize = 200000;
  const nBatches = Math.ceil(combinations.length / batchSize);
  let batchIndex = 0;

  while (batchIndex < nBatches) {
    const output = [];
    const startIndex = batchIndex * batchSize;
    const endIndex = startIndex + batchSize;
    const batch = combinations.slice(startIndex, endIndex);
    const nCombinations = batch.length;
    for (let i = 0; i < nCombinations; i++) {
      console.log(
        "Batch " +
          (batchIndex + 1) +
          "/" +
          nBatches +
          " - Combination " +
          (i + 1) +
          "/" +
          nCombinations
      );
      const combination = batch[i];
      const id1 = combination[0];
      const id2 = combination[1];
      const item1 = input.find((item) => item.id === id1);
      const item2 = input.find((item) => item.id === id2);
      const words1 = item1.text.split(" ").filter((word) => word.length > 3);
      const words2 = item2.text.split(" ").filter((word) => word.length > 3);
      const length1 = words1.length;
      const length2 = words2.length;
      const union = length1 + length2;
      const intersection =
        length1 < length2
          ? words1.filter((word) => words2.includes(word)).length
          : words2.filter((word) => words1.includes(word)).length;
      const jaccard = intersection / union;
      const outputItem = {
        ids: [id1, id2],
        platforms: [item1.platform, item2.platform],
        dates: [item1.date, item2.date],
        tags: [item1.tags, item2.tags],
        titles: [item1.title, item2.title],
        textLengths: [length1, length2],
        jaccardIndex: jaccard,
      };
      output.push(outputItem);
    }
    await write(
      "./output/06-data-similarities-batch-" + (batchIndex + 1) + ".json",
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
