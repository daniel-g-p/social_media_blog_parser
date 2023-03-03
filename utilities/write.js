import fs from "fs";

export default async (path, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, {}, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};
