'use strict';

const path = require('path');
const level = require('level');
const multilevel = require('multilevel');
const xtend = require('xtend');

const HOMEPATH = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
const DBPATH = path.join( HOMEPATH, '/.level-server');
const SEP_CHAR    = '\xff'; // session key is Base64 and has a prefix 'session:' so | avoids dups
const LUP_OPTIONS = {
    errorIfExists   : false
  , createIfMissing : true
  , keyEncoding     : 'utf8'
  , valueEncoding   : 'utf8'
}

function LevelStore (options) {
  if (!(this instanceof LevelStore))
    return new LevelStore(options)

  if (typeof options == 'string')
    options = { location: options }

  this._dbkey = function (id, key) {
    return SEP_CHAR + id + SEP_CHAR + (key || '')
  }

  let DB = level( DBPATH, LUP_OPTIONS );
  this._db = multilevel.client();
  let ms = multilevel.server(DB);
  ms.pipe(this._db.createRpcStream()).pipe(ms);
}

LevelStore.prototype.get = function (id, key, token, callback) {
  // brutish but it updates ttl on all entries
  this.getAll(id, expire, function (err, data) {
    if (err) return callback(err)
    callback(null, data[key])
  })
}

LevelStore.prototype.getAll = function (id, options, callback) {
  var ret   = {}
    , keys = []
    console.log(
      'id',id,
      'options',options
    );

  this._forEach(
      id
    , options
    , function (key, value) {
        console.log('key',key,'value',value);
        ret[key] = JSON.parse(value)
        keys.push(dbkey(id, key))
      }
    , function () {
        console.log('GETALL RETURN',ret);
        callback(null, ret)
      }.bind(this)
  )
}


function getAll(request, response, tokens, data){
    let collection = request.url.substring(1);
    console.log('data',data);
    console.log('collection',collection);
    db.get( `${data.app}::${collection}`, function (error, val) {
        if(error){
             response.writeHead(500);
             response.end(JSON.stringify(error.message));
             return;
         }
         response.end(JSON.stringify(val));
       });
}

LevelStore.prototype.set = function (id, key, value, expire, callback) {
  this.extend(id, expire, function () {
    this._db.put(
        dbkey(id, key)
      , JSON.stringify(value)
      , xtend(LUP_OPTIONS, { ttl: expire })
      , callback
    )
  }.bind(this))
}

LevelStore.prototype.extend = function (id, expire, callback) {
  this.getAll(id, expire, function (err) { callback && callback(err) })
}


LevelStore.prototype.del = function (id, key, expire, callback) {
  this.extend(id, expire, function () {
    this._db.del(
        dbkey(id, key)
      , LUP_OPTIONS
      , function (err) {
          if (err) return callback(err)
          this.extend(id, expire, callback)
        }.bind(this)
    )
  }.bind(this))
}

LevelStore.prototype.delAll = function (id, callback) {
  var batch = []
  this._forEach(
      id
    , function (key) {
        batch.push({ type: 'del', key: dbkey(id, key) })
      }
    , function () {
        this._db.batch(batch, LUP_OPTIONS, callback)
      }.bind(this)
  )
}


LevelStore.prototype.close = function (callback) {
  this._db.close(callback)
}


function batch(request, response, tokens, data){
  this._db.batch(data, function (error) {
    if(error){
         response.writeHead(500);
         response.end(JSON.stringify(error.message));
         return;
     }
     response.writeHead(200, {'Content-Type': 'text/plain'});
     response.end('batch upload complete\n');
  })
}

// LevelStore.prototype.batch = function (id, fn, callback) {
//   this._db.batch(data, function (error) {
//     if(error){
//          response.writeHead(500);
//          response.end(JSON.stringify(error.message));
//          return;
//      }
//      response.writeHead(200, {'Content-Type': 'text/plain'});
//      response.end('batch upload complete\n');
//   })
// }
LevelStore.prototype.batch = function (id, skip, limit, data, callback) {
    this._db.batch(data, LUP_OPTIONS,  (err)=>{
        callback(err,'Successful upload');
      })
}


LevelStore.prototype._forEach = function (id, options, fn, callback) {
  let OPTIONS = {
    //   gte : this._dbkey(options.id) || this._dbkey(id)
    // , lte   : this._dbkey(options.id) + SEP_CHAR || this._dbkey(id) + SEP_CHAR
    // ,
    reverse: options.reverse || false
    , limit: Number(options.limit) || -1

  };

  var rs  = this._db.createReadStream( xtend(LUP_OPTIONS, OPTIONS) );

  rs.on('data', function (data) {

      var lkey = data.key.split(SEP_CHAR)
      if (lkey.length == 3)
      console.log('data',data,'lkey',lkey)
      fn(lkey[2], data.value)
    })
    .on('close', callback)
    .on('error',(err)=>{
      console.log('DB GET ERROR',err);
    })

}

module.exports = LevelStore
