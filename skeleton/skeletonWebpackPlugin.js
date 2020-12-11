/**
 * 我是一个插件  在编译 src/index.js 生效 我负责启动一次新的编译
 * 用 webpack-skeleton.js 做为配置文件 得到输出的其实是一个svg图片 直接插入到 <div id="root"></div>
 * compiler代表整个编译对象
 * compilation代表一次编译
 */
let webpack = require('webpack');
let MFS = require('memory-fs');//内存版的fs模块
let requireFromString = require('require-from-string')
//let result = requireFromString('module-exports = 'hello');
//reslut = 'hello'
let mfs = new MFS();
let path = require('path')
class SkeletonWebpackPlugin {
    constructor(options) {
        this.options = options;
    }

    apply(compiler) {
        let {webpackConfig} = this.options;
        // 将插件注册到compilation钩子
        // tap(触及) 到 compilation hook，而在 callback 回调时，会将 compilation 对象作为参数，
       //创建SkeletonWebpackPlugin tap就是一个发布订阅
        compiler.hooks.compilation.tap('SkeletonWebpackPlugin', compilation => {
            console.log('The compiler is starting a new compilation...');
            //我们在这监听 webpack-html-plugin创建模本 在处理之前 把页面换掉
            //tapAsync 异步监听事件
            // BeforeHtmlProcessing html-webpack-plugin的一个钩子函数
            // 现在，通过 compilation 对象，我们可以 tap(触及) 到各种可用的 hooks 了
            console.log(compilation.hooks, 'compilation.hooks')
            //监听html处理事件
            compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tapAsync('SkeletonWebpackPlugin', (htmlPluginData, callbak) => {
                // htmlPluginData.html 读到的html文件
                // 我在这个地方要开启一次新的编译
                console.log('html-webpack-plugin编译dom之前')
                let childCompiler = webpack(webpackConfig);
                //子编译放到内存里 outputFileSystem 指定编译后用什么模块输出
                childCompiler.outputFileSystem = mfs;
                let outPutPath = path.join(webpackConfig.output.path, webpackConfig.output.filename)
                console.log(outPutPath);
                childCompiler.run((err,data) => {
                    //以同步的方式读取文件内容
                    console.log('开始新的编译')
                     let skeletonJs = mfs.readFileSync(outPutPath,'utf8')
                    let result = requireFromString(skeletonJs);
                     let svg = result.default;
                    htmlPluginData.html = htmlPluginData.html.replace('<div id="root"></div>', `<div id="root">${svg}</$div>`)
                    callbak(null, htmlPluginData);
                })
            })
        })
    }

}
module.exports = SkeletonWebpackPlugin
