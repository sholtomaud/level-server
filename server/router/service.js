'use strict';

const db = require('../persistence');
const requestData = require('request-data');
const logger = require('../logger');
const retorter = require('./retorter')(logger);
const wraperr = require('wraperr');
const url = require('url');
const jsonBack = require('json-back');
const validate = require('../validation');

function getAll(retort){
  var queryString = url.parse(retort.request.url, true).query;
  var queryStrin = url.parse(retort.request.url, true);
  console.log('query',queryStrin);
  jsonBack.parse(queryString.q, function(error, query){
    console.log('queryQ',queryString.q);
        //       retort.ok()
        //       ok: function(request, response, data){
        //     response.statusCode = 200;
        //     response.end(transformFunction(data));
        // },
        //

        // actions['record.getAll'](
        //     retort.request.account,
        //     [
        //         query || {},
        //         queryString.skip || '',
        //         queryString.limit || ''
        //     ],
        //     wraperr(
        //         retort.ok,
        //         retort.error
        //     )
        // );
  });
}

function handler(retort){
  let URL = url.parse(retort.request.url, true);
  let queryString = URL.query;
  let path = URL.pathname.substring(1);
  // console.log('URL:',URL);
  // console.log('query',queryString);
  // console.log('path',path);

  validate[ path ]( 'account',
      [
          // queryString || {},
          queryString.skip || '',
          queryString.limit || 1
      ],
      wraperr( retort.ok, retort.error )
  );
}

// var recordActions = {};
//
// addAction(recordActions, services.record.get, 'record.get');


function get(retort, tokens){
  var queryString = url.parse(retort.request.url, true).query;
  console.log('query',queryString);
  jsonBack.parse(queryString.q, function(error, query){
    console.log('query2',queryString);
      retort.error();
          // wraperr(
          //     retort.ok,
          //     retort.error
          // )
  });
}

module.exports = {
    '/batch': {
      POST: requestData(retorter(db.batch))
    },
    '/del/`id`': {
      DELETE: retorter(db.delete)
    },
    '/delAll': {
      DELETE: retorter(db.deleteAll)
    },
    '/get/`id`': {
        GET: retorter(handler)
    },
    '/getAll': {
        POST: retorter(handler)
    },
    '/set/`id`': {
        PUT: requestData(retorter(db.set))
    }
};
