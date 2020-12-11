// webpack.dev.js
// const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path');
const base = require('./webpack.base');
const {merge} = require('webpack-merge');
const config = merge(base, {
    mode: 'development',
    // 输出目录
    // 开发环境下并不会产生 dist 到磁盘目录 而是存储在内存中
    entry: './src/skeleton.js',
    target: 'node', //要给node 使用 let fs =
    output:{
        filename: 'skeleton.js',
        libraryTarget: 'commonjs2' //最终把这个文件的导出结果 放到module.exports上 node规范
    },
    plugins: [

    ],
})

module.exports = config
