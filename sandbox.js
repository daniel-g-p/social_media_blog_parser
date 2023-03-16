import read from "./utilities/read.js";
import write from "./utilities/write.js";

import youtube from "./modules/youtube.js";
import uniqueId from "./utilities/id.js";

const init = async () => {
  const input = await read("./output/05-data-alphanumeric.json")
    .then((res) => {
      return JSON.parse(res);
    })
    .catch((error) => {
      console.log(error);
      return [];
    });

  const output = input
    .map((item) => {
      const itemCharacters = item.text.split("");
      const alphanumeric = itemCharacters.reduce((text, character) => {
        const asciiCode = character.charCodeAt(0);
        const isAlphanumeric =
          (asciiCode >= 48 && asciiCode <= 57) ||
          (asciiCode >= 65 && asciiCode <= 90) ||
          (asciiCode >= 97 && asciiCode <= 122)
            ? true
            : false;
        text += isAlphanumeric ? character : " ";
        return text;
      });
      item.text = alphanumeric;
      return item;
    })
    .map((item) => {
      item.text = item.text
        .split(" ")
        .map((word) => word.trim())
        .filter((word) => word)
        .join(" ")
        .toLowerCase();
      return item;
    });

  await write("./output/06-data-alphanumeric.json", JSON.stringify(output));

  // console.log(output.slice(200, 201));
  // const characters = data
  //   .reduce((characters, item) => {
  //     const itemCharacters = item.text.split("");
  //     for (const itemCharacter of itemCharacters) {
  //       if (!characters.includes(itemCharacter)) {
  //         characters.push(itemCharacter);
  //       }
  //     }
  //     return characters;
  //   }, [])
  //   .sort();

  // console.log(characters);
};

init();
