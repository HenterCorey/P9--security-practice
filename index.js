const Koa = require('koa');
const fs = require('fs');
const path = require('path');
const router = require('./routers/index');
const bodyParser = require('koa-bodyparser');
const static = require('koa-static');
// 静态资源目录对于相对入口文件index.js的路径
const staticPath = './static'
const app = new Koa();
// const ratelimit = require('koa-ratelimit');
// const Redis = require('ioredis');
// var favicon = require('koa-favicon');
// var limit = require('koa-limit');
// 使用ctx.body解析中间件
app.use(bodyParser());
// 设置静态目录
app.use(static(
  path.join( __dirname,  staticPath)
));
//使用koa-ratelimit防范DDOS
// app.use(ratelimit({
//   db: new Redis(),
//   duration: 60000,
//   errorMessage: 'Sometimes You Just Have to Slow Down.',
//   id: (ctx) => ctx.ip,
//   headers: {
//     remaining: 99,//'Rate-Limit-Remaining',
//     reset: 1384377793,//'Rate-Limit-Reset',
//     total: 'Rate-Limit-Total'
//   },
//   max: 100,
//   disableHeader: false,
// }));
// app.use(async (ctx) => {
//   ctx.body = 'Stuff!';
// });
//使用koa-limit防范DDOS
// app.use(favicon());
// app.use(limit({
//   limit: 1000,
//   interval: 1000 * 60 * 60
// }));

// app.use(function *() {
//   this.body = 'hello';
// });
//设置router
app.use(router.routes()).use(router.allowedMethods());
app.listen(3000, () => {
    console.log('website is starting at port 3000');
});
