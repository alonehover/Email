const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

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

app.use(bodyParser());

router.get('/', (ctx, next) => {
    ctx.body = {
        code: 'send email'
    }
});

router.post('/send', async (ctx, next) => {
    const data = ctx.request.body;
    const verify = ["from", "to", "subject"];

    for (const item of verify) {
        if(data[item] === "" || data[item] === undefined) {
            ctx.body = {
                code: 500,
                message: "缺少参数" + item
            }
            return;
        }
    }

    try {
        const info = await Email({
            from: data.from,
            to: data.to,
            subject: data.subject,
            text: data.text || '',
            html: data.html || '',
        });
    } catch (error) {
        ctx.body = {
            code: error.responseCode,
            res: error.response
        }

        return;
    }

    ctx.body = {
        code: 0
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