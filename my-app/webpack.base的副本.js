// webpack.dev.js
const HtmlWebpackPlugin = require('html-webpack-plugin')

const path = require('path')

const config = {
    mode: 'development',
    // 输出目录
    // 开发环境下并不会产生 dist 到磁盘目录 而是存储在内存中
    output: {
        // 编译后的的资源引用地址的前缀都会加上 publicPath
        // webpack-dev-server 会在 publicPath 下启用服务来访问 webpack 输出的文件
        // 输出目录路径
        path: path.resolve(__dirname, 'dist')
        // 最终输出的文件名
        // filename: 'js/[name].bundle.js',
    },
    resolve: {
        // 模块引入如果不加后缀名 根据以下后缀名顺序查找
        extensions: ['.js', '.jsx']
    },
    // 模块配置
    // webpack 会循环遍历上面提到的依赖树 根据下面 rule 的配置 找到对应的模块资源文件 交给对应的 loader 加载 最终把加载的结果打包到 bundle.js 中
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    plugins: ['transform-runtime'],
                    presets: ['es2015', 'react', 'stage-2']
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
                            plugins: [
                                ['@babel/plugin-proposal-decorators', {legacy: true}],
                                ['@babel/plugin-proposal-class-properties', {loose: true}]
                            ],
                            // 开启 babel-loader 加载结果的缓存
                            // 指定的目录将用来缓存 loader 的加载结果 设置空值或者 true 的话 使用默认缓存目录 node_modules/.cache/babel-loader
                            cacheDirectory: true
                        }
                    }
                ],
            },
            // 匹配后缀名为 .less 的模块
            {
                test: /\.less/,
                // loader 加载资源模块 类似工作管道 可以使用多个 loader 加载同一个资源模块 最终返回一段标准的 js 代码字符串（webpack 默认只支持 js 的语法）
                // 多个 loader 执行顺序是从后往前执行
                use: [
                    // 把 css-loader 的处理结果 通过 style 标签 添加到 html 页面
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            // 此处开启 在他前面的所有 loader 都必须开启
                            sourceMap: true,
                            // 在当前 loader 加载之前的 loader 数量
                            importLoaders: 1
                        }
                    },
                    {
                        // 把 .less 模块的内容加载成 css
                        loader: 'less-loader',
                        options: {
                            // 开启源码地图（可理解成源码中的错误定位）
                            sourceMap: true
                        }
                    }
                ]
            },
            // 匹配图片资源模块
            {
                test: /\.(png|jpg|jpeg|gif)/,
                use: [
                    {
                        // loader: 'file-loader',
                        loader: 'url-loader',
                        options: {
                            limit:0,
                            name: '[name].[ext]',
                            // 打包到 ouput.path + images 目录下
                            outputPath: 'images',
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use:['style-loader', 'css-loader']
            }
        ]
    },
    // 开发服务 这里使用的是 webpack-dev-server
    devServer: {
        // 页面刷新出现 404 重新定向到 output.path 下的index.html
        historyApiFallback: true,
        // // 告诉服务器从哪个目录中提供内容
        // contentBase: paths.appDist,
        // 服务端口
        port: 8080,
        // webpack 打包完成 自动打开浏览器
        open: true,
    },
    plugins: [
        // 首次打包的时候清除 output.path 目录中所有的文件 保留 ouput.path 文件夹 并且再每次 rebuild 的时候会清除所有不再被使用的文件
        // new CleanWebpackPlugin(),
        // 自动生成 html 页面 并把打包后的资源内容 自动添加到页面上
        new HtmlWebpackPlugin({
            // 指定 html 模板路径
            template: path.resolve(__dirname, 'src/index.html'),
            // 打包后的文件名
            filename: 'index.html'
        })
    ],
}

module.exports = config
