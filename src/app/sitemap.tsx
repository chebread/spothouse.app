const sitemap = async () => {
  const routes = [""].map((route: any) => ({
    url: `https://spothouse.app${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes];
};

export default sitemap;
