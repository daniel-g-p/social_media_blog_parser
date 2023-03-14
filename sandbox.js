import read from "./utilities/read.js";

const init = async () => {
  const input = await read("./output/facebook_text.json")
    .then((res) => JSON.parse(res))
    .catch((error) => {
      console.log(error);
      return [];
    });
  console.log(input);
};

init();
