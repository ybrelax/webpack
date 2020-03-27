const path = require("path");
const merge = require("webpack-merge");
const webpack = require("webpack");
const baseWebpackConfig = require("./webpack.config.base");
const apiMocker = require('mocker-api');

module.exports = merge(baseWebpackConfig, {
  devServer: {
    before(app){
      apiMocker(app, path.resolve('./mock/mocker.js'))
    },
    port: "3000",
    compress: true,
    hot: true,
    // proxy: {
    //   "/api": "http://localhost:4000"
    // }
  },
  plugins: [
    new webpack.DefinePlugin({
      DEV: JSON.stringify("dev"), //字符串
      FLAG: "true" //FLAG 是个布尔类型
    })
  ]
});
