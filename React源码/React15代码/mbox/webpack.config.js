const path = require("path");
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// console.log(HtmlWebpackPlugin)
module.exports = {
  entry: path.resolve(__dirname, "./src/index.jsx"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: [
                ["@babel/plugin-proposal-decorators", { "legacy": true }],
                ["@babel/plugin-proposal-class-properties", { "loose": true }]
            ],
          },
        },
      },
    ],
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //     template: './src/index.html', // 源模板文件
    // })
  ],
};
