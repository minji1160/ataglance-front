const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      //target: 'https://dafadynssf.execute-api.us-east-1.amazonaws.com/ataglance-stage',
      target : 'http://localhost:8080',
      //target : 'http://54.163.90.190:8080',
      changeOrigin: true,
    }),
  );
};