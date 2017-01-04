const Router = require('koa-router');
const app = require('koa')();
const sendfile = require('koa-sendfile');
const path = require('path');
const indexSer = require(path.resolve('koa/services/' + path.basename(__dirname) + '/index.js'));

module.exports = function () {
    const router = new Router();
    router.get('/index', function *() {
        yield sendfile(this, path.resolve('public/html/'+path.basename(__dirname))+'/index.html');

    }).get('/indexdata', function *() {
        var $self = this;
        yield indexSer().index().then(function(parsedBody){
            const responseText = JSON.parse(parsedBody);
            $self.body = responseText;
        })
    }).get('/modules',function *(){
        yield sendfile(this, path.resolve('public/html/'+path.basename(__dirname))+'/module.html');
    })
    return router;
};