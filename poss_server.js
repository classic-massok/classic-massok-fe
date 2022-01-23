const express = require("express");
const { default: next } = require("next");
const Cookies = require("Cookies");
const URL = require("url");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
// const httpProxy = require('http-proxy');
// const apiProxy = httpProxy.createProxyServer();
// const apiServer = 'http://localhost:4000',

const proxyMiddleware = require("http-proxy-middleware");

const devProxy = {
  "/api/graphql": {
    target: "http://localhost:8080",
    changeOrigin: true
  }
};

const proxy = {}

app
  .prepare()
  .then(() => {
    const server = express();

    if (dev) {
      Object.keys(devProxy).forEach(function(context) {
        server.use(proxyMiddleware.createProxyMiddleware(context, devProxy[context]));
      });
    } else {
      Object.keys(proxy).forEach(function(context) {
        server.use(proxyMiddleware.createProxyMiddleware(context, proxy[context]));
      });
    }

    server.all("*", (req, res) => handle(req, res))
    server.listen(3000, err => {
      if (err) throw err;
      console.log("> Ready on http://localhost:3000");
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });