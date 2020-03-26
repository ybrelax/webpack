
const path = require('path');
const HtmlWbapckPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {

  module: {
    rules: [
        {
          test: /\.(le|c)ss$/,
          use: ['style-loader', 'css-loader']
        }
    ]
  },
  plugins: [
    new HtmlWbapckPlugin({
      template: './public/index.html',
      filename: 'index.html'
    }),
    new CopyWebpackPlugin([
      {
        from: 'public/js/*.js',
        to: path.resolve(__dirname, 'dist', 'js'),
        flatten: true 
      }
    ],  {
      ignore: ['other.js']
    })
  ]
}