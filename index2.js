import facebook from "./modules/facebook.js";

import write from "./utilities/write.js";

const init = async () => {
  const facebookItems = await facebook.getItems();
  const facebookItemsFileName =
    "./output/facebook-items-" + Date.now() + ".json";
  const facebookItemsFileData = JSON.stringify(facebookItems);
  await write(facebookItemsFileName, facebookItemsFileData);

  process.exit();
};

init();
