const Koa = require('koa');
const Router = require('koa-router');

const config = require('./config.json');
const Email = require('./email');

const app = new Koa();
const router = new Router();

// x-response-time
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
});

// logger
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

router.get('/', (ctx, next) => {
    ctx.body = {
        code: 'send email'
    }
});

router.post('/send', (ctx, next) => {
    ctx.body = {
        code: 1
    }
});
  
app
.use(router.routes())
.use(router.allowedMethods());

app.use(async ctx => {
    ctx.body = {
        code: 404
    }
});

app.listen(config.port || 3000, function() {
    console.log("starting at http://localhost:" + (config.port || 3000));
});

app.on('error', err => {
    log.error('server error', err)
});