const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  const apiProxy = createProxyMiddleware({
    target: "http://localhost:8090",
    changeOrigin: true,
  });

  app.use("/api", apiProxy);
};
