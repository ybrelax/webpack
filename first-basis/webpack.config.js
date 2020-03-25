// 引入插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';
const config = require('./public/config')[isDev ? 'dev' : 'build'];
module.exports = {

    mode: isDev ? 'development' : 'production',
    devServer: {
        port: '3000', //默认是8080
        quiet: false, //默认不启用
        inline: true, //默认开启 inline 模式，如果设置为false,开启 iframe 模式
        stats: "errors-only", //终端仅打印 error
        overlay: false, //默认不启用
        clientLogLevel: "silent", //日志等级
        compress: true //是否启用 gzip 压缩
    },
    // 加载loader
    module: {
        rules: [
            {
                test: /\.jsx?$/, // 正则判断文件后缀名
                use: ['babel-loader'], //使用什么loader
                exclude: /node_modules/ //排除 node_modules 目录
            },
            {
                test: /\.(le|c)ss$/,
                use: ['style-loader', 'css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        plugins: function () {
                            return require('autoprefixer')({
                                "overrideBrowserslist": [
                                    ">0.25%",
                                    "not dead"
                                ]
                            })
                        }
                    }
                }]
            },
          
            {
                test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240, //10K
                            esModule: false 
                        }
                    }
                ],
            },
               // 处理本地图片
            {
                test: /\.(htm|html)$/i,
                use: 'html-withimg-loader'
            },
           
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html', // 文件位置
            filename: 'index.html', // 打包后生成的文件名
            minify: {
                removeAttributeQuotes: false, // 是否删除属性的双引号
                collapseWhitespace: false, // 是否折叠空白
            },
            config: config.template
            // hash: true 是否加上hash
        })
    ]
}