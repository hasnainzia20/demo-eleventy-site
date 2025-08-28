// .eleventy.js
function slugify(str) {
  return String(str || "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function (eleventyConfig) {
  // eleventyConfig.addPassthroughCopy("public"); // optional assets folder
  // eleventyConfig.addPassthroughCopy("_headers");
  // eleventyConfig.addPassthroughCopy("_redirects");
  // eleventyConfig.addPassthroughCopy(".prettierignore");
  // eleventyConfig.addPassthroughCopy("favicon.ico");
  // eleventyConfig.addPassthroughCopy("README.md");
  // eleventyConfig.addPassthroughCopy("robots.txt");
  // eleventyConfig.addPassthroughCopy("sitemap.xml");
  const pathPrefix = eleventyConfig.globalData.pathPrefix || "/";

  eleventyConfig.addFilter("slugify", slugify);

  eleventyConfig.addFilter("excerpt", function (content, length = 140) {
    if (!content) return "";
    const stripped = String(content)
      .replace(/(<([^>]+)>)/gi, "")
      .replace(/\s+/g, " ")
      .trim();
    return stripped.length > length
      ? stripped.slice(0, length).trim() + "…"
      : stripped;
  });

  eleventyConfig.addCollection("tools", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/tools/**/*.{njk,md}")
      .sort((a, b) => {
        return (a.data.title || "").localeCompare(b.data.title || "");
      });
  });

  eleventyConfig.addCollection("categories", function (collectionApi) {
    const tools = collectionApi.getFilteredByGlob("src/tools/**/*.{njk,md}");
    const map = new Map();
    tools.forEach((item) => {
      const name = item.data.category || "Uncategorized";
      if (!map.has(name)) map.set(name, []);
      map.get(name).push(item);
    });
    return Array.from(map.entries()).map(([name, items]) => ({
      name,
      slug: slugify(name),
      items,
    }));
  });

  return {
    dir: {
      input: "src", // where your content lives
      includes: "_includes", // relative to input
      layouts: "_includes", // also relative to input
      data: "_data",
      output: "_site",
    },
    pathPrefix: pathPrefix,
    templateFormats: ["md", "njk", "html", "liquid"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
