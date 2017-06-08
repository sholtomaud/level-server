// client.js
var request = require('request')
  , jar     = request.jar()
  , port    = 8080
  , host     = 'http://172.17.0.7:'
  , req     = function(url, cb) {
      request({
          url: host + port + '/' + url
        , jar: jar
        , json: true
      }, cb)
    };

req('set/foo/bar', function () {
  console.log('Set foo = bar')
  req('get/foo', function (e, res, body) {
    console.log('Fetched foo = [', body,'] ')
    
  })
})
