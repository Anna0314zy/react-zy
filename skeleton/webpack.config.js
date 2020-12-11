const path = require('path')
const HTMLplugin = require('html-webpack-plugin')
const base = require('./webpack.base');
const SkeletonWebpackPlugin = require('./skeletonWebpackPlugin')
const {merge} = require('webpack-merge');
module.exports = merge(base, {
    mode: 'development',
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
                test: /\.css$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
       new SkeletonWebpackPlugin({
           webpackConfig: require('./webpack.skeleton')
       })
    ]
})
