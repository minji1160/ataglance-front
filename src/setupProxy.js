const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: 'https://dafadynssf.execute-api.us-east-1.amazonaws.com/ataglance-stage',
      changeOrigin: true,
    }),
  );
};