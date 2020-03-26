
const path = require('path');
const HtmlWbapckPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
  devServer: {
    port: '3000',
    compress: true
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            hmr: isDev,
            reloadAll: true,
          }
        }
          , 'css-loader', {
          loader: 'postcss-loader',
          options: {
            plugins: function () {
              return [
                require('autoprefixer')()
              ]
            }
          }
        }]
      }
    ]
  },
  plugins: [
    new OptimizeCssPlugin(),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      publicPath: '../'
    }),
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
    ], {
      ignore: ['other.js']
    })
  ]
}