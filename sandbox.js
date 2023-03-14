import read from "./utilities/read.js";
import write from "./utilities/write.js";

import youtube from "./modules/youtube.js";

const init = async () => {
  const youtubeInput = await read("./output/youtube_text.json")
    .then((res) => JSON.parse(res))
    .catch((error) => {
      console.log(error);
      return [];
    });

  // const data2 = await read("./output/_data2.json").then((res) => {
  //   return JSON.parse(res);
  // });

  // const characters = data2
  //   .reduce((characters, item) => {
  //     const itemCharacters = item.text
  //       .normalize("NFD")
  //       .replace(/[\u0300-\u036f]/g, "")
  //       .split("");
  //     for (const itemCharacter of itemCharacters) {
  //       if (!characters.includes(itemCharacter)) {
  //         characters.push(itemCharacter);
  //       }
  //     }
  //     return characters;
  //   }, [])
  //   .sort();

  // console.dir(characters, { maxArrayLength: null });

  const youtubeOutput = await youtube.getItemsText(youtubeInput);
  await write(
    "./output/youtube_text-" + Date.now() + ".json",
    JSON.stringify(youtubeOutput)
  );
};

init();

// const validCharacters = [
//   " ",
//   "!",
//   '"',
//   "#",
//   "$",
//   "%",
//   "&",
//   "'",
//   "(",
//   ")",
//   "*",
//   "+",
//   ",",
//   "-",
//   ".",
//   "/",
//   "0",
//   "1",
//   "2",
//   "3",
//   "4",
//   "5",
//   "6",
//   "7",
//   "8",
//   "9",
//   ":",
//   ";",
//   "<",
//   "=",
//   ">",
//   "?",
//   "@",
//   "A",
//   "B",
//   "C",
//   "D",
//   "E",
//   "F",
//   "G",
//   "H",
//   "I",
//   "J",
//   "K",
//   "L",
//   "M",
//   "N",
//   "O",
//   "P",
//   "Q",
//   "R",
//   "S",
//   "T",
//   "U",
//   "V",
//   "W",
//   "X",
//   "Y",
//   "Z",
//   "[",
//   "]",
//   "^",
//   "_",
//   "`",
//   "a",
//   "b",
//   "c",
//   "d",
//   "e",
//   "f",
//   "g",
//   "h",
//   "i",
//   "j",
//   "k",
//   "l",
//   "m",
//   "n",
//   "o",
//   "p",
//   "q",
//   "r",
//   "s",
//   "t",
//   "u",
//   "v",
//   "w",
//   "x",
//   "y",
//   "z",
//   "{",
//   "|",
//   "}",
//   "~",
// ];
