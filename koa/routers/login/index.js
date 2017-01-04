const Router = require('koa-router');
const app = require('koa')();
const sendfile = require('koa-sendfile');
const path = require('path');
const loginSer = require(path.resolve('koa/services/' + path.basename(__dirname) + '/index.js'));

module.exports = (config)=> {
    const router = new Router();
    router.get('/login', function *() {
        let stats = yield (sendfile(this, path.resolve('public/html/'+path.basename(__dirname))+'/index.html'));
        if (!this.status) {
            this.throw(404);
        }
    }).post('/login', function *() {
        let user = this.request.body;
        let $self = this;
        yield (loginSer().login(user)
            .then( (parsedBody)=> {
                let responseText = JSON.parse(parsedBody);
                let userData = responseText.users;//后台数据
                // console.info("后台数据：",responseText.users);
                // console.info("前台数据：",user);
                $self.body = responseText;
                if(user.username==userData.username&&user.password==userData.password){
                    $self.body = responseText;
                    //设置cookie(signed加密)
                    $self.cookies.set(responseText.users.username,responseText.users.password,{ signed: true });

                }else {
                    $self.body={'msg':'账号或密码错误，请重新输入！',errno:2}
                }
            }).catch((error)=> {
                if (error.error && error.error.code && error.error.code =='ETIMEDOUT') {//登录超时
                    $self.body = {'msg':'登录超时,请尝试重新登录.',errno:3};
                    $self.status = 408;
                }
            }));
    });
    return router;
};