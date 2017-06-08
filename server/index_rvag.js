// server.js
var http           = require('http')
  , levelSession   = require('./level-session')('/tmp/level_session_example.db')
  , port           = 8080

http.createServer(function (req, res) {
  levelSession(req, res, function () {
    var m
    , url = req.url.split('/');
    url.shift()
    url.shift();
    req.url = url.join('/');
    console.log('got a call', req.url);
    res.writeHead(200)

    if (m = req.url.match(/^get\/(.+)/)) {
      return req.session.get(m[1], function (err, data) {
        console.log('in get',data,err);
        res.end(JSON.stringify(data))
      })
    } else if (m = req.url.match(/^set\/([^\/]+)\/(.+)/)) {
      return req.session.set(m[1], m[2], function () {
        console.log('in set');
        res.end(JSON.stringify(m[2]))
      })
    } else if (m = req.url.match(/^all\//)) {
      return req.session.getAll(function (err, data) {
        console.log('in req',data,err);
        res.end(JSON.stringify(data))
      })
    }

    res.end('ERROR')
  })
}).listen(port)
