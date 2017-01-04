const Router = require('koa-router');
const app = require('koa')();
const sendfile = require('koa-sendfile');
const path = require('path');
const fs = require('fs');
const stream = require('koa-stream');
const findSer = require(path.resolve('koa/services/' + path.basename(__dirname) + '/index.js'));
const config = require(path.resolve('plugins/read-config.js'));
const fetch = require('node-fetch');//url转发

module.exports = function(config){
    const router = new Router();
    router.get('/findpw', function *(next){//转到找回密码页面
        const stats = yield (sendfile(this, path.resolve('public/html/' + path.basename(__dirname)) + '/index.html'));
        if(!this.status){
            this.throw(404);
        }
    }).get('/captcha', function *(next){
        var $self = this;
        yield (fetch(config['rurl']+'/captcha?key='+($self.request.ip+$self.request.get("User-Agent")))
            .then(function(res) {
                return res.buffer();
            }).then(function(buffer) {
                $self.set('content-type','image/png');
                $self.body = buffer;
            }));
    }).post('/findpw/verifyEmail', function *() {
        let user = this.request.body;
        let $self = this;
        yield (findSer().verifyEmail(user)
            .then(function (parsedBody) {
                let responseText = JSON.parse(parsedBody);
                console.info(user);
                console.info(responseText);
                $self.body = responseText;
                if(user.email!=responseText.email){
                    $self.body={'msg':'用户不存在！',errno:2}
                }else if(user.code!=responseText.code){
                    $self.body={'msg':'验证码不正确！',errno:2}
                }else {
                    $self.body=responseText
                    console.info(responseText);
                    $self.cookies.set("userEmail",responseText.email);
                }

            }).catch(function (error) {
                if (error.error && error.error.code && error.error.code =='ETIMEDOUT') {//登录超时
                    $self.body = {'msg':'网络超时！',errno:3};
                    $self.status = 408;
                }
            }));
    })


    .get('/findpw/email_code',function*(){
        var stats = yield (sendfile(this, path.resolve('public/html/' + path.basename(__dirname)) + '/email_code.html'));
        if(!this.status){
            this.throw(404);
        }
    }).get('/findpw/checkmail', function *(next){
             yield (sendfile(this, path.resolve('public/html/' + path.basename(__dirname)) + '/checkmail.html'));
            if(!this.status){
                this.throw(404);
            }
    }).get('/findpw/newpw', function *(next){
            yield (sendfile(this, path.resolve('public/html/' + path.basename(__dirname)) + '/newpw.html'));
            if(!this.status){
                this.throw(404);
            }
    }).post('/findpw/newpw', function *(next){//新密码
        var user = this.request.body;
        var $self = this;
        yield (findSer().newpw(user)
            .then(function(parsedBody){
                var responseText = JSON.parse(parsedBody);
                console.info(responseText);
                if(responseText['errno'] == 0){
                    $self.body = responseText;
                } else {
                    $self.body = responseText;
                }
            }).catch(function(error){
                console.info(error);
                if(error.error && error.error.code && error.error.code == 'ETIMEDOUT'){//登录超时
                    $self.body = {'msg' : '注册超时,请尝试重新注册.', errno : 3};
                    $self.status = 408;
                }
            }));
    }).get('/findpw/finish',function*(next){
        yield (sendfile(this, path.resolve('public/html/' + path.basename(__dirname)) + '/finish.html'));
    })

    return router;
};