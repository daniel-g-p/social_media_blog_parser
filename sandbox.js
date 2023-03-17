import uniqueId from "./utilities/id.js";
import read from "./utilities/read.js";
import write from "./utilities/write.js";

const init = async () => {
  for (let i = 1; i <= 95; i++) {
    const input = await read(
      "./output/06-data-similarities-batch-" + i + ".json"
    )
      .then((res) => JSON.parse(res))
      .catch((error) => {
        console.log(error);
        return [];
      });
    const n = input.length;
    const sampleIndexes = [];
    const sampleSizePercentage = 0.0005;
    const sampleSize = Math.round(sampleSizePercentage * n);
    const output = [];
    for (let j = 0; j < sampleSize; j++) {
      let sampleIndex = Math.floor(Math.random() * n);
      while (sampleIndexes.includes(sampleIndex)) {
        sampleIndex = Math.floor(Math.random() * n);
      }
      output.push(input[sampleIndex]);
      sampleIndexes.push(sampleIndex);
    }
    await write(
      "./output/06-data-similarities-samples/06-data-similarities-sample-" +
        i +
        ".json",
      JSON.stringify(output)
    );
  }
  // for (let i = 1; i <= 95; i++) {
  //   console.log("Batch " + i);
  //   const input = await read(
  //     "./output/06-data-similarities-batch-" + i + ".json"
  //   )
  //     .then((res) => JSON.parse(res))
  //     .catch((error) => {
  //       console.log(error);
  //       return [];
  //     });
  //   for (const item of input) {
  //     output.push(item);
  //   }
  // }
  // console.log(output.length);
  // await write("./output/06-data-similarities.json", JSON.stringify(output));
};

init();
