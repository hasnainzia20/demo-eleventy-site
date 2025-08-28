export default {
  name: "Tooleble",
  url: process.env.SITE_URL || "https://tooleble.com",
  baseUrl: (() => {
    if (process.env.ELEVENTY_ENV === "development") {
      return "/"; // local dev
    }
    if (process.env.SITE_URL?.includes("github.io")) {
      return "/demo-eleventy-site/"; // GitHub Pages subpath
    }
    return "/"; // production domain
  })(),
};
