import validateUrl from "../utilities/validate-url.js";

export default (platform, date, title, description, tags, author, url) => {
  const model = {
    platform: [
      "Facebook",
      "Instagram",
      "LinkedIn",
      "Pinterest",
      "Reddit",
      "Snapchat",
      "Stack Overflow",
      "TikTok",
      "Twitter",
      "WhatsApp",
      "YouTube",
    ].includes(platform)
      ? platform
      : "",
    date: date instanceof Date && date.getTime() < Date.now() ? date : null,
    title: typeof title === "string" ? title.trim() : "",
    description: typeof description === "string" ? description.trim() : "",
    tags:
      Array.isArray(tags) && tags.every((tag) => typeof tag === "string" && tag)
        ? tags
        : [],
    author: typeof author === "string" ? author.trim() : "",
    url:
      typeof url === "string" && validateUrl(url)
        ? url.toLowerCase().trim()
        : "",
  };
  return model.platform && model.date && model.title && model.url
    ? model
    : null;
};
