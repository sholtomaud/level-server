'use strict';

const http = require('http');
const router = require('./router');
const corsRoute = require('simple-cors');
const PORT = process.env.npm_package_config_port

const server = http.createServer();

server.on('request', corsRoute(router.createHandler()));

server.listen(PORT, function(){
  console.log('listening on port %d...', PORT)
});
