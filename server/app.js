/**
 * Created by Ranshaw on 2017/8/2.
 */
'use strict';

const Koa            = require('koa');
const router         = require('koa-router')();
const app            = new Koa();
const routerRegister = require('./router/index');
const bodyParser     = require('koa-bodyparser');
const cors           = require('koa-cors');
const koaJson        = require('koa-json');
const serve          = require('koa-static');
const logger         = require('koa-logger');
const compress       = require('koa-compress');
const path           = require('path');
const port           = process.env.PORT || 3002;
const refreshData    = require('./refreshData');

app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
  await next();
});

app.use(cors());
app.use(koaJson());
app.use(bodyParser());
// app.use(serve(path.resolve(__dirname,'../public')));
app.use(compress());
app.use(logger());

routerRegister.register(app);

/*初始化数据*/
refreshData();

app.listen(port);
console.log(`Server started at port ${port}...`);

