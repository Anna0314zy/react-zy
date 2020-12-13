const webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
module.exports={
    mode:'development',
    entry: './src/index.tsx',
    output:{
        path: path.join(__dirname, 'dist')
    },
    devtool: "source-map",
    devServer: {
        hot:true,
        contentBase: path.join(__dirname, 'dist'),
        historyApiFallback: {
            index:'index.html'
        }
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    module: {
        rules: [
            {
                test:/\.tsx?$/,
                loader: 'ts-loader'
            },
            {
                test:/\.tsx?$/,
                enforce: "pre",
                loader: 'source-map-loader'
            },
            {
                test:/\.less?$/,
                loader: ['style-loader','css-loader','less-loader']
            },
            {
                test:/\.(jpg|png|gif)/,
                loader: 'url-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html"
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
}
