const Koa = require('koa');
const router = require('koa-router')()
const app = new Koa();

router.get('/api/info', (ctx, next) => {
  ctx.response.body = "you are good"
})

// 增加中间件
app.use(router.routes())
app.listen(4000);
console.log('app start at port: 4000')