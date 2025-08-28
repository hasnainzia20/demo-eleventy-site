export default {
  url:
    process.env.ELEVENTY_ENV === "production"
      ? "https://tooleble.com"
      : "http://localhost:8080",
};
