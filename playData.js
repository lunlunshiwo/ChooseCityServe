var express = require('express'),
    city = require('./city'),
    app = express(),
    http = require('http');
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
app.get('/', function (req, res) {
    res.send(city);
    res.end()
});
app.get('/nowcity', function (req, res) {
    let getIpInfo = function (cb) {
        var url = 'http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=json';
        http.get(url, function (res) {
            var code = res.statusCode;
            if (code == 200) {
                res.on('data', function (data) {
                    try {
                        cb(JSON.parse(data));
                    } catch (err) {
                        console.log(err)
                    }
                });
            }
        }).on('error',function(e){
            cb({
                city: "北京",
                country: "中国",
                province: "北京",
            })
        })
    };
    getIpInfo(function (msg) {
        let nowcity = msg
        res.send(nowcity)
        res.end()
    })
});
app.listen('1234', function () {
    console.log('1234 is running')
});
