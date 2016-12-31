var request = require('request-promise');
var path = require('path');
module.exports = function (argvs) {
    this.login = function (argvs) {
        var rep = null;
        var options = {
            method: 'POST',
            timeout:3000,
            uri: 'http://localhost:8888/datas/login.json',
            form: argvs,
            headers: {
                /* 'content-type': 'application/x-www-form-urlencoded' */ // Set automatically
            }
        };
        return request(options);
    }

    return this;
}