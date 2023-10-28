export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/"],
      },
    ],
    sitemap: "https://spothouse.app/sitemap.xml",
    host: "https://spothouse.app",
  };
}
