import read from "./utilities/read.js";
import write from "./utilities/write.js";

import aoaToXlsx from "./utilities/aoa-to-xlsx.js";

const init = async () => {
  const input = await read("./output/06-data-filtered.json")
    .then((res) => JSON.parse(res))
    .catch((error) => {
      console.log(error);
      return [];
    });
  console.log(input.length);
};

init();

// Q1: Is there a significant increase in text similarity?

// Q2: Which platforms copy the most/least?

// Q3: Which platforms are copied the most/least?

// Q4: How quickly do platforms react to changes in other platforms?

// Q5: Which platforms are closest/furthest from each other?
