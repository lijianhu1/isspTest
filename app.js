var app = require('koa')();//koa web应用
var path = require('path');//路径
var router = require("koa-router")();//路由中间件
var serve = require('koa-static-server');
var session = require('koa-session');//cookie
var koaBody = require('koa-body');
var json = require('koa-json');
var cors = require('koa-cors');
const routersPath = '/koa/routers/';


//============路由跳转=============
app.use(cors());//跨域请求,用于与browser-sync调试
app.keys = ['issp'];//session加密值
app.use(session(app));//使用cookie
app.use(koaBody());//必需要路由用之前使用,不然获取不到表单
router.get('/', function *(next) {//根路由
    this.redirect('/login');//重写向到登录页面
    this.status = 301;
});



app.use(require(path.join(__dirname,routersPath,'login/index.js'))().routes());//登录路由
app.use(require(path.join(__dirname,routersPath,'findpw/index.js'))().routes());//找回密码
app.use(require(path.join(__dirname,routersPath,'index/index.js'))().routes());//首页
app.use(require(path.join(__dirname,routersPath,'error/index.js'))().routes());//错误路由

//============路由跳转=============


//============静态文件资源===========
app.use(serve({rootDir: 'public'}));
//============静态文件资源===========


app.use(router.routes());
app.use(function *(next) {
    if (this.status == 404) {
        this.redirect('/404');
    } else if (this.status == 500){
        this.redirect('/500');
    } else {
        yield next;
    }
});


app.listen(8888, function () {
    console.log('已开启服务：localhost: '+8888);
});
// module.exports = app;