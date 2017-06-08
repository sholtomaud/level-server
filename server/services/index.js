'use strict';

const LevelDB = require('../persistence/db.js');
const errorFunction = require('./errorFunction');

const db = new LevelDB();
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

// function getAll(account, query, skip, limit, callback){
//     var where = {
//             companyId: account.companyId,
//             enabled: true
//         };
//
//     if(query.where){
//         for(var key in query.where){
//             where['data.' + key] = query.where[key];
//         }
//     }
//
//     db.getAll
//         where,
//         fields,
//         callback
//     ).
//     limit(limit);
// }

// function get(account, id, callback){

// function getAll(request, response, tokens, data){
function getAll(account, skip, limit, callback){
    // let collection = request.url.substring(1);
    // console.log('request',request);
    // console.log('data',data);
    // console.log('response',response);
    // console.log('tokens',tokens);
    // response.end(JSON.stringify(data));
    let options = {
      limit: limit
      // ,
      // query: query
    }
    // db.Record.find(
    //     where,
    //     fields,
    //     callback
    // ).
    // limit(limit);

// errorFunction(callback)
  // console.log('services getAll', query, limit);
    // LevelStore.prototype.getAll = function (id, options, callback) {
// console.log('db',db);
    db.getAll( 'id', options, function (error, vals) {
      if(error){
          console.log('err',error);
          //  response.writeHead(500);
          //  response.end(JSON.stringify(error.message));
           callback(error,null);
       }
      //  console.log('erturn from db',vals);
      //  response.end(JSON.stringify(val));
       callback(null,vals)
     });
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
