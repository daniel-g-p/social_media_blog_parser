import XLSX from "xlsx";

import read from "./utilities/read.js";
import write from "./utilities/write.js";

const init = async () => {
  const output = await read("./output/_data.json")
    .then((res) => JSON.parse(res))
    .then((res) => {
      return res
        .map((item) => {
          item.date = new Date(item.date);
          return item;
        })
        .sort((a, b) => {
          return b.date - a.date;
        });
    });
  await write("./output/_data-new.json", JSON.stringify(output));
  // const input = await read("./output/_data.json")
  //   .then((res) => JSON.parse(res))
  //   .then((res) => {
  //     return res
  //       .map((item) => {
  //         return [
  //           item.platform,
  //           new Date(item.date),
  //           item.title,
  //           item.description,
  //           item.tags.join(", "),
  //           item.author,
  //           item.url,
  //         ];
  //       })
  //       .sort((a, b) => {
  //         return b[1] - a[1];
  //       })
  //       .map((item) => {
  //         item[1] = item[1].toISOString().slice(0, 10);
  //         return item;
  //       });
  //   })
  //   .then((res) => {
  //     res.splice(0, 0, [
  //       "Platform",
  //       "Date",
  //       "Title",
  //       "Description",
  //       "Tags",
  //       "Author",
  //       "URL",
  //     ]);
  //     return res;
  //   })
  //   .catch(() => []);

  // const workbook = XLSX.utils.book_new();
  // const worksheet = XLSX.utils.aoa_to_sheet(input);
  // XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  // XLSX.writeFile(workbook, "./output/_data2.xlsx");

  // const _data = await read("./output/_data.json")
  //   .then((res) => res.toString())
  //   .then((res) => JSON.parse(res))
  //   .then((res) => {
  //     return res
  //       .map((item) => {
  //         return [
  //           item.platform,
  //           item.date,
  //           item.title,
  //           item.description,
  //           item.tags.join(","),
  //           item.author,
  //           item.url,
  //         ];
  //       })
  //       .sort((a, b) => {
  //         return a.date - b.date;
  //       });
  //   });
  // _data.splice(0, 0, [
  //   "Platform",
  //   "Date",
  //   "Title",
  //   "Description",
  //   "Tags",
  //   "Author",
  //   "URL",
  // ]);
  // const workbook = XLSX.utils.book_new();
  // const worksheet = XLSX.utils.aoa_to_sheet(_data);
  // XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
  // XLSX.writeFile(workbook, "./output/_data" + 1 + ".xlsx");

  process.exit();
};

init();
