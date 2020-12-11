
const HTMLplugin = require('html-webpack-plugin')
const path = require('path');
const base = require('./webpack.base');
module.exports = {
    entry: path.join(__dirname, 'src', 'index.js'),
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './build')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                // 匹配后缀为 .js|.jsx 的模块
                test: /\.jsx?$/,
                // 需要排除目录 接受正则匹配与绝对路径
                include: path.join(__dirname, 'src'),
                exclude: /node_modules/,
                use: [
                    {
                        // 通过 babel 对源代码中的 后缀为 .js｜.jsx的语法 进行转换（转换配置可写在根目录下的 .bablrc文件中）
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react'],
                            // plugins: [
                            //     ['@babel/plugin-proposal-decorators', {legacy: true}],
                            //     ['@babel/plugin-transform-runtime', '@babel/plugin-proposal-class-properties', {loose: true}]
                            // ]
                        }
                    }
                ],
            },
            // 匹配图片资源模块
            {
                test: /\.(png|jpg|jpeg|gif)/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit:0
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new HTMLplugin({
            template: './public/index.html',
            filename: "index.html"
        })
    ]
}
