import read from "./utilities/read.js";
import write from "./utilities/write.js";

import youtube from "./modules/youtube.js";

const init = async () => {
  const data = await read("./output/03-data-formatted.json").then((res) => {
    return JSON.parse(res);
  });

  const characters = data
    .reduce((characters, item) => {
      const itemCharacters = item.text.split("");
      for (const itemCharacter of itemCharacters) {
        if (!characters.includes(itemCharacter)) {
          characters.push(itemCharacter);
        }
      }
      return characters;
    }, [])
    .sort();

  console.log(characters);
};

init();

// original, ascii

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
