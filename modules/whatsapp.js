import puppeteer from "../utilities/puppeteer.js";
import wait from "../utilities/wait.js";
import write from "../utilities/write.js";

export default async () => {
  const browser = await puppeteer(false);
  console.log("1. Browser launched");

  const page = await browser.newPage();
  await page.goto("https://blog.whatsapp.com");
  await wait(3000);
  console.log("2. Page opened");

  const acceptCookiesButton = await page.waitForSelector(
    "div._9yxe._9sc_._9sdc._9sd4._9sd8 button._ain3._9vcv._advm"
  );
  await acceptCookiesButton.evaluate((el) => el.click());
  console.log("3. Cookies accepted");

  let nextPageButton;
  const items = [];
  const scrapeItems = async () => {
    await wait(3000);
    const liElements = await page.$$("div._9r_7._9t33");
    for (const liElement of liElements) {
      const titleElement = await liElement.$("h1");
      const titleText = titleElement
        ? await titleElement.evaluate((el) => el.textContent)
        : "";
      const title =
        titleText && typeof titleText === "string" ? titleText.trim() : "";
      const linkElement = titleElement ? await titleElement.$("a") : "";
      const linkText = linkElement
        ? await linkElement.evaluate((el) => el.getAttribute("href"))
        : "";
      const link =
        linkText && typeof linkText === "string"
          ? "https://newsroom.pinterest.com" + linkText.toLowerCase().trim()
          : "";
      const dateElement = await liElement.$("article._9ta2");
      const dateText = dateElement
        ? await dateElement.evaluate((el) => el.textContent)
        : "";
      const date =
        dateText && typeof dateText === "string" ? dateText.trim() : "";
      const item = { title, link, date };
      items.push(item);
    }
    nextPageButton = await page.$("a._9vcv._advn._9scd._9sct");
  };
  await scrapeItems();
  while (nextPageButton) {
    await nextPageButton.evaluate((el) => el.click());
    await scrapeItems();
  }
  console.log("4. Blog elements parsed");

  const fileName = "./output/whatsapp-" + Date.now() + ".json";
  const fileData = JSON.stringify(items);
  await write(fileName, fileData);
  console.log("5. Scrape process completed");

  await browser.close();
  console.log("6. Browser closed");
};
