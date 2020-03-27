const path = require("path");
const webpack = require('webpack');
const HtmlWbapckPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssPlugin = require("optimize-css-assets-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

if(module && module.hot) {
  module.hot.accept()
}
module.exports = {
  entry: {
    index: './src/index.js',
    login: './src/login.js'
  },
  output: {
    path: path.resolve(__dirname, "dist"), //必须是绝对路径
    filename: "[name].[hash:6].js",
    publicPath: "/" //通常是CDN地址
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/, // 正则判断文件后缀名
        use: ["babel-loader"], //使用什么loader
        exclude: /node_modules/ //排除 node_modules 目录
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true,
              reloadAll: true
            }
          },
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: function() {
                return [require("autoprefixer")()];
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), //热更新插件
    new OptimizeCssPlugin(),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      publicPath: "../"
    }),
    new HtmlWbapckPlugin({
      template: "./public/index.html",
      filename: "index.html"
    }),
    new HtmlWbapckPlugin({
      template: "./public/index.html",
      filename: "login.html",
      chunks: ['login']
    }),
    new CopyWebpackPlugin(
      [
        {
          from: "public/js/*.js",
          to: path.resolve(__dirname, "dist", "js"),
          flatten: true
        }
      ],
      {
        ignore: ["other.js"]
      }
    )
  ]
};
