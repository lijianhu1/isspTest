var request = require('request-promise');
var path = require('path');
var config = require(path.resolve('plugins/read-config.js'));
var form = require(path.resolve('plugins/form.js'));

module.exports = function (argvs) {
    this.verifyEmail = function (argvs) {
        var rep = null;
        var options = {
            method: 'POST',
            timeout:3000,
            uri: 'http://localhost:8888/datas/findpw.json',
            form: argvs,
            headers: {
                /* 'content-type': 'application/x-www-form-urlencoded' */ // Set automatically
            }
        };
        return request(options);
    };
    this.captcha = function () {
        var options = {
            method: 'get',
            timeout:3000,
            uri: 'http://localhost:8888/datas/findpw.json',
            headers: {
                /* 'content-type': 'application/x-www-form-urlencoded' */ // Set automatically
            }
        };
        return request(options);
    };

    this.newpw = function (argvs) {
        var options = {
            method: 'POST',
            timeout:3000,
            uri: 'http://localhost:8888/datas/findpw.json',
            form: argvs,
            headers: {
                /* 'content-type': 'application/x-www-form-urlencoded' */ // Set automatically
            }
        };
        return request(options);
    };


    return this;
}