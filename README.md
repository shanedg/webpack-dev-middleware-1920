# webpack-dev-middleware-1920

Minimal reproduction for [webpack-dev-middleware#1920](https://github.com/webpack/webpack-dev-middleware/issues/1920)

`webpack serve` crashes on HEAD requests when `devServer.historyApiFallback = true` for versions ^7.3.0.

## Steps to Reproduce With Version 7.3.0

`webpack-dev-middleware` is overridden to use version 7.3.0 in this package.
Steps below also tested with version 7.4.1.

### Pass

1. `npm i`
1. `npm start`
1. in another terminal, run `curl --head http://localhost:8080`
1. observe that curl succeeds with 200 OK and webpack process continues to run

### Fail

1. `npm i`
1. uncomment `historyApiFallback: true` in under `devServer` property in `./webpack.config.js`
1. `npm start`
1. in another terminal, run `curl --head http://localhost:8080`
1. observe that curl succeeds with 200 OK but webpack process crashes

```sh
webpack 5.93.0 compiled with 1 warning in 1694 ms
node:internal/errors:496
    ErrorCaptureStackTrace(err);
    ^

Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
    at new NodeError (node:internal/errors:405:5)
    at ServerResponse.setHeader (node:_http_outgoing:648:11)
    at setResponseHeader (/Users/shanegarrity/dev/webpack-dev-middleware-1920/node_modules/webpack-dev-middleware/dist/utils/compatibleAPI.js:120:14)
    at processRequest (/Users/shanegarrity/dev/webpack-dev-middleware-1920/node_modules/webpack-dev-middleware/dist/middleware.js:624:7)
    at ready (/Users/shanegarrity/dev/webpack-dev-middleware-1920/node_modules/webpack-dev-middleware/dist/utils/ready.js:16:5)
    at middleware (/Users/shanegarrity/dev/webpack-dev-middleware-1920/node_modules/webpack-dev-middleware/dist/middleware.js:666:5)
    at Layer.handle [as handle_request] (/Users/shanegarrity/dev/webpack-dev-middleware-1920/node_modules/express/lib/router/layer.js:95:5)
    at trim_prefix (/Users/shanegarrity/dev/webpack-dev-middleware-1920/node_modules/express/lib/router/index.js:328:13)
    at /Users/shanegarrity/dev/webpack-dev-middleware-1920/node_modules/express/lib/router/index.js:286:9
    at Function.process_params (/Users/shanegarrity/dev/webpack-dev-middleware-1920/node_modules/express/lib/router/index.js:346:12) {
  code: 'ERR_HTTP_HEADERS_SENT'
}

Node.js v18.20.2
```

### Version 7.2.1

HEAD requests do not crash the application if `devServer.historyApiFallback = true` for version 7.2.1.
Update the `overrides` property in `./package.json` and rerun `npm i` and repeat the steps above.

```diff
"overrides": {
-  "webpack-dev-middleware": "7.3.0"
+  "webpack-dev-middleware": "7.2.1"
}
```

Observe that curl succeeds with 200 OK and webpack process continues to run for both Pass and Fail cases.

### GET Requests Succeed

GET requests do not crash the application in any of the above scenarios.
