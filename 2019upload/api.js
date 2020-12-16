let koa = require('koa');
let koaStatic = require('koa-static');
let koaBody = require('koa-body');
let path = require('path');
let fs = require('fs');
let app = new koa();
app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', "*");
    ctx.set('Access-Control-Allow-Headers', "Content-Type,Accept");
    ctx.set('Access-Control-Allow-Methods', "PUT,POST,DELETE,GET,OPTIONS");
    if (ctx.method ==='OPTIONS') {
        ctx.body = 200;
    }else {
        await next();
    }

})
app.use(koaBody({
    formidable:{uploadDir: path.resolve(__dirname, 'uploads')},
    multipart: true
}))
app.use(koaStatic(path.resolve(__dirname,'uploads')));
app.use(async (ctx, next) => {
    if (ctx.url === '/upload') {
        
       let file = ctx.request.files.file;
       console.log('====================================');
       console.log(file, 'file----------')
       console.log('====================================');
      
       let filename = path.basename(file.path) + path.extname(file.path);
       fs.renameSync(file.path, path.join(path.dirname(file.path), filename));

     
       ctx.body = {
           url: `http://localhost:8081/${filename}`
       }
    }else {
        await next();
    }
})
app.listen(8081, () => {
    console.log('服务端在8080端口启动了');
})
