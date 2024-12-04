const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: 'http://54.163.90.190:8080',
      changeOrigin: true,
    }),
  );
};