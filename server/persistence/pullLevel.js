'use strict';

const path = require('path');
const level = require('level');
// const multilevel = require('multilevel');
const xtend = require('xtend');
const pl = require('pull-level');
const pull = require('pull-stream');

const HOMEPATH = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
const DBPATH = path.join( HOMEPATH, '/.level-server');
const SEP_CHAR    = '\xff'; // session key is Base64 and has a prefix 'session:' so | avoids dups
const LUP_OPTIONS = {
    errorIfExists   : false
  , createIfMissing : true
  , keyEncoding     : 'utf8'
  , valueEncoding   : 'utf8'
}

let db = level( DBPATH, LUP_OPTIONS );

pull(
  pull.values([
    {key: 'key', value: 'VALUE', type: 'put'},
    {key: '~INDEX~' + 'VALUE.prop', value: 'key',  type: 'put'},
  ]),
  pl.write(db)
)

// pull(
//   pl.read(db, {min: '~INDEX~', max: '~INDEX~~'}),
//   pull.asyncMap(function (e, cb) {
//     db.get(e, function (value) {
//       cb(null, {key: e, value: value})
//     })
//   }),
//   pull.collect(console.log)
// )
pull(
  pl.live(db, {live: true,min: '~INDEX~', max: '~INDEX~~'}),
  pull.through(cb),
  pull.drain()
)
