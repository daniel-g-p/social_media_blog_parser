import { writeFile, utils } from "xlsx";

const { book_new, aoa_to_sheet, book_append_sheet } = utils;

export default (filePath, aoaData) => {
  const book = book_new();
  const sheet = aoa_to_sheet(aoaData);
  book_append_sheet(book, sheet, "Sheet1");
  writeFile(book, filePath);
};
