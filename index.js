import facebook from "./modules/facebook.js";
import instagram from "./modules/instagram.js";

const init = async () => {
  // await instagram();
  await facebook();
  process.exit();
};

init();
