var express = require('express')
var app = express()

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.sendFile(__dirname+'/build/index.html')
})

app.use('/css',express.static(__dirname+'/build/css', {
  maxage: '31557600s'
}));

app.use('/build',express.static(__dirname+'/build', {
  maxage: '31557600s'
}));

app.use('/',express.static(__dirname+'/build', {
  maxage: '31557600s'
}));

app.use('/images',express.static(__dirname+'/build/images', {
  maxage: '31557600s'
}));

var server = app.listen(9000,function(){    /*监听端口*/
    var host = server.address().address;
    var port = server.address().port; 
    console.log('example app listening at http://%s:%s',host,port);  /*控制台输出*/
});
