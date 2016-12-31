var Router = require('koa-router');
var sendfile = require('koa-sendfile');
var path = require('path');
var config = require('../../../plugins/read-config.js');

module.exports = function (config) {
    var router = new Router();
    router.get('/404', function *() {
        yield (sendfile(this, path.resolve('public/html/' + path.basename(__dirname)) + '/404.html'));
    }).get('/500', function *() {
        yield (sendfile(this, path.resolve('public/html/' + path.basename(__dirname)) + '/500.html'));
    })

    return router;
};