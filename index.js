import instagram from "./modules/instagram.js";

const init = async () => {
  await instagram();
  process.exit();
};

init();
