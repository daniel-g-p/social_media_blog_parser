import read from "./utilities/read.js";
import write from "./utilities/write.js";

import twitter from "./modules/twitter.js";

const init = async () => {
  const youtubeInput = await read("./output/youtube_text.json")
    .then((res) => JSON.parse(res))
    .catch((error) => {
      console.log(error);
      return [];
    });

  const data2 = await read("./output/_data2.json").then((res) => {
    return JSON.parse(res);
  });

  const characters = data2
    .reduce((characters, item) => {
      const itemCharacters = item.text
        .normalize("NFC")
        .replace(/[\u0300-\u036f]/g, "")
        .split("");
      for (const itemCharacter of itemCharacters) {
        if (!characters.includes(itemCharacter)) {
          characters.push(itemCharacter);
        }
      }
      return characters;
    }, [])
    .sort();

  console.dir(characters, { maxArrayLength: null });

  //   const youtubeEmpty = youtubeInput.filter((item) => !item.text);
  //   console.log(youtubeEmpty);
  //   const youtubeOutput = await youtube.getItemsText(youtubeEmpty);
};

init();
