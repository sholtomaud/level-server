'use strict';

const db = require('./db');

// db.batch(ops, function (err) {
//   if (err) return console.log('Ooops!', err) // some kind of I/O error
//   console.log('done');
//   //cb(null,'batch upload complete')
//   // db.get('controls', function (err, val) {
//   //      if (err) throw err;
//   //      console.log(val);
//   //    });
// })

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

function delAll(request, response, tokens, data){
    let collection = request.url.substring(1);
    console.log('data',data);
    console.log('collection',collection);
    response.end(JSON.stringify(data));
    // db.get( `${data.app}::${collection}`, function (error, val) {
    //     if(error){
    //          response.writeHead(500);
    //          response.end(JSON.stringify(error.message));
    //          return;
    //      }
    //      response.end(JSON.stringify(val));
    //    });
}

function del(request, response, tokens, data){
    let collection = request.url.substring(1);
    console.log('data',data);
    console.log('collection',collection);
    response.end(JSON.stringify(data));
    // db.get( `${data.app}::${collection}`, function (error, val) {
    //     if(error){
    //          response.writeHead(500);
    //          response.end(JSON.stringify(error.message));
    //          return;
    //      }
    //      response.end(JSON.stringify(val));
    //    });
}

function getAll(request, response, tokens, data){
    let collection = request.url.substring(1);
    console.log('getAss',data);
    console.log('collection',collection);
    response.end(JSON.stringify(data));
    // db.get( `${data.app}::${collection}`, function (error, val) {
    //     if(error){
    //          response.writeHead(500);
    //          response.end(JSON.stringify(error.message));
    //          return;
    //      }
    //      response.end(JSON.stringify(val));
    //    });
}

function get(request, response, tokens, data){
    let collection = request.url.substring(1);
    console.log('get',data);
    console.log('collection',collection);
    console.log(JSON.stringify(data.name));

    response.end(JSON.stringify(data));
    // db.get( `${data.app}::${collection}`, function (error, val) {
    //     if(error){
    //          response.writeHead(500);
    //          response.end(JSON.stringify(error.message));
    //          return;
    //      }
    //      response.end(JSON.stringify(val));
    //    });
}

function set(request, response, tokens, data){
    let collection = request.url.substring(1);
    console.log('data',data);
    console.log('collection',collection);
    response.end(JSON.stringify(data));
    // db.get( `${data.app}::${collection}`, function (error, val) {
    //     if(error){
    //          response.writeHead(500);
    //          response.end(JSON.stringify(error.message));
    //          return;
    //      }
    //      response.end(JSON.stringify(val));
    //    });
}

module.exports = {
  batch: batch,
  del: del,
  delAll: delAll,
  get: get,
  getAll: getAll,
  set: set
}
