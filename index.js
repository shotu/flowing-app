
'use strict';

const config = require('./config');
if (config.get("newrelic:enabled")) {
  require('newrelic');
}

const Hapi = require('hapi');
const fs = require('fs');

const server = new Hapi.Server({
  connections: {
    routes: {
      cors: true,
      response: {
        modify: true, //joi options
        options: {
          stripUnknown: true
        }
      }
    }
  }
});

server.connection({
  host: config.get("server:host"),
  port: Number(config.get("server:port"))
});


server.register(require('./plugins/flow-apis'), function (err) {
    if (err) {
      console.error("Error in loading plugins aborting Launch..!", err)
    } else {
      server.start(function () {
        console.log("server started at  ", server.info);
      });
    }
  }
);

module.exports = server;
