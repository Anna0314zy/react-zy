// webpack.dev.js
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path');
const base = require('./webpack.base');
const {merge} = require('webpack-merge');
// const SkeletonWebpackPlugin = require('./skeletonWebpackPlugin')
const config = merge(base, {
    // mode: 'development',
    // 输出目录
    // 开发环境下并不会产生 dist 到磁盘目录 而是存储在内存中
    entry: './src/index.js',
    output:{
        filename: 'main.js',
    },
    plugins: [
        // new SkeletonWebpackPlugin({
        //     webpackConfig:require('./webpack.skeleton')
        // })

    ],
})

module.exports = config
