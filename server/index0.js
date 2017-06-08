const http = require('http');
const path = require('path');
const HOMEPATH = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
const level = require('level');
// const router = require('./router');
// const config = require('./config');
const corsRoute = require('simple-cors');
const requestData = require('request-data');
const PORT = 8088;
const server = http.createServer();
const SeaLion = require('sea-lion');
const router = new SeaLion();
const multilevel = require('multilevel');

const DB = level( path.join( HOMEPATH, '/.level-server'), {valueEncoding: 'json'} );

let db = multilevel.client();
let ms = multilevel.server(DB);
ms.pipe(db.createRpcStream()).pipe(ms);

function create(request, response, tokens, data){
    console.log(JSON.stringify(data.name));
    console.log(request.url);
    console.log(request.body);

    response.end(JSON.stringify(data.name));
    // siteService.create(request.headers.authorization, data, function(error, dat){
    //
    //     if(error){
    //         response.writeHead(500);
    //         response.end(JSON.stringify(error.message));
    //         return;
    //     }
    //
    //     response.end(JSON.stringify(dat));
    // });
}

function batch(request, response, tokens, data){
  db.batch(data, function (error) {
    if(error){
         response.writeHead(500);
         response.end(JSON.stringify(error.message));
         return;
     }
     response.writeHead(200, {'Content-Type': 'text/plain'});
     response.end('batch upload complete\n');
  })
}


function get(request, response, tokens){
    siteService.get(request.headers.authorization,tokens.siteId, function(error, site){

        if(error){
            response.writeHead(404);
            response.end(JSON.stringify(error.message));
            return;
        }

        response.end(JSON.stringify(site));
    });
}

function getAll(request, response, tokens, data){
    let collection = request.url.substring(1);
    db.get( `${data.app}::${collection}`, function (error, val) {
        if(error){
             response.writeHead(500);
             response.end(JSON.stringify(error.message));
             return;
         }
         response.end(JSON.stringify(val));
       });
}



router.add({
    '/data': {
        POST: requestData(create),
        GET: create
    },
    '/data/`dataId`': {
        GET: create,
        PUT: create
    },
    '/controls': {
        POST: requestData(getAll)
    },
    '/controls/batch': {
        PUT: requestData(batch),
        POST: requestData(batch)
    },
    '/home': {
        POST: requestData(getAll)
    }
});

server.on('request', corsRoute(router.createHandler()));

server.listen(PORT, function(){
  console.log('listening on port %d...', PORT)
});
