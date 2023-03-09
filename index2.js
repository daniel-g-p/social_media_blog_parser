import facebook from "./modules/facebook.js";
import instagram from "./modules/instagram.js";
import linkedin from "./modules/linkedin.js";
import pinterest from "./modules/pinterest.js";

import write from "./utilities/write.js";

const init = async () => {
  //   const facebookItems = await facebook.getItems();
  //   const facebookItemsData = await facebook.getItemsData(facebookItems);
  //   const facebookFileName = "./output/facebook-" + Date.now() + ".json";
  //   const facebookFileData = JSON.stringify(facebookItemsData);
  //   await write(facebookFileName, facebookFileData);

  //   const instagramItems = await instagram.getItems();
  //   const instagramItemsData = await instagram.getItemsData(instagramItems);
  //   const instagramFileName = "./output/instagram-" + Date.now() + ".json";
  //   const instagramFileData = JSON.stringify(instagramItemsData);
  //   await write(instagramFileName, instagramFileData);

  //   const linkedinItems = await linkedin.getItems();
  //   const linkedinItemsData = await linkedin.getItemsData(linkedinItems);
  //   const linkedinFileName = "./output/linkedin-" + Date.now() + ".json";
  //   const linkedinFileData = JSON.stringify(linkedinItemsData);
  //   await write(linkedinFileName, linkedinFileData);

  const pinterestItems = await pinterest.getItems();
  const pinterestItemsData = await pinterest.getItemsData(
    pinterestItems.slice(0, 2)
  );
  console.log(pinterestItemsData);
  //   const pinterestFileName = "./output/pinterest-" + Date.now() + ".json";
  //   const pinterestFileData = JSON.stringify(pinterestItemsData);
  //   await write(pinterestFileName, pinterestFileData);

  process.exit();
};

init();
