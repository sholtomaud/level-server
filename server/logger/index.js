var bunyan = require('bunyan'),
    config = require('../config'),
    bsyslog = require('bunyan-syslog');

module.exports =  bunyan.createLogger({
    name: config.serverName,
    streams: [
        {
          level: 'debug',
          type: 'raw',
          stream: bsyslog.createBunyanStream({
            type: 'sys',
            facility: bsyslog.local0,
            host: '192.168.0.1',
            port: 514
          })
        },
        {
            level: config.logLevel,
            stream: process.stdout,
        },
        {
            level: config.logLevel,
            path: '/tmp/logs/' + config.logFileName
        }
    ]
});
