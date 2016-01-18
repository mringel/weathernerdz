var express = require('express');
var app = express();
// var proxy = require('express-http-proxy');
//
// var httpProxy = require('http-proxy');
//
//
// var apiProxy = httpProxy.createProxyServer();
//
// app.get("/api/*", function(req, res){
//   apiProxy.web(req, res, { target: 'https://api.forecast.io/forecast/ddd77ff3c434ad2c1efc34ede4e8e01' });
// });

// app.get("/api/*", function(req, res){
//   apiProxy.web(req, res, { target: 'https://api.forecast.io/forecast/ddd77ff3c434ad2c1efc34ede4e8e016' });
// });

// app.use('/proxy/*', proxy('api.forecast.io/forecast/ddd77ff3c434ad2c1efc34ede4e8e016', {
//   forwardPath: function(req, res) {
//     return require('url').parse(req.url).path;
//   }
// }));

app.use(express.static('build'));

app.listen(3000, function() {
  console.log('server listening on port 3000');
});
