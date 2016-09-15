
'use strict';
var config = require('../../config');
const routes = require('./routes');
const async = require('async');
const inert = require('inert');
const vision = require('vision');
const hapiSwagger = require('hapi-swagger');
const pack = require('../../package');
const authScheme = require('./auth/scheme');
const logger = require('./utils/logger-utils').logger;
var register = function (server, options, next) {


  let slavehost1 = config.get("database:mysql:slave1");
  var slaveHosts = [{host: slavehost1.host, username: slavehost1.username, password: slavehost1.password}];


  var masterHost = {
    host: config.get("database:mysql:master:host"),
    username: config.get("database:mysql:master:username"),
    password: config.get("database:mysql:master:password")
  };

  var options = {
    register: require('hapi-sequelize'),
    options: {
      database: config.get("database:mysql:db"),
      user: null,
      pass: null,
      dialect: 'mysql',
      port: 3306,
      models: 'plugins/flow-apis/models/mysql/*.js',
      sequelize: {
        define: {
          underscoredAll: false,
          timestamps: true

        },
        timezone: "+05:30",
        replication: {
          write: masterHost,
          read: slaveHosts
        },
        pool: {
          max: 20,
          min: 5
        }
      }
    }
  }

  var swaggerOptions = {
    basePath: '/v1',
    sortEndpoints: 'path',
    pathPrefixSize: 2,
    info: {
      'title': 'Flow API Documentation',
      'version': pack.version
    }
  }

  async.series([
    function (callback) {
      server.register(options, function (err) {
        if (err) {
          console.error('failed to load plugin ' + err);
        }
        callback(err);
      }
                     );
    }, function (callback) {
      server.register([
        inert,
        vision, {
          register: hapiSwagger,
          options: swaggerOptions
        }], function (err) {
          if (err) {
            console.error('failed to load plugin swagger', err);
          }
          callback(err);
        });
    },function (callback) {
      server.register({
        register: require('hapi-qs'),
        options: {
          payload: false
        }
      }, function(err){
        if(err){
          console.log('failed to load qs plugin. err = ', err);
        }
        callback(err);
      })
    }, function(callback) {
      //Auth strategy..
      server.register(authScheme, function (err) {
        if (err) {
          console.error('failed to load plugin ', err);
          callback(err);
        } else {
          console.log("auth registered successfully");
          server.auth.strategy('flow-auth', 'auth-token', config.get("auth:enabled") ,{validateFunc: require('./auth/validator')});
          callback(null);
        }

      });
    }
  ], function (err) {
    if (!err) {

      server.ext('onPreHandler', function (modelCollections) {
        return function (request, reply) {
          logger.info('request info', request.info);
          logger.info('request url', request.url);
          logger.info('request method', request.method);
          if(request.headers.accept === 'application/json' && request.payload){
            logger.info('request payload', request.payload);
          }
          request.models = modelCollections;
          reply.continue();
        }
      }(server.plugins['hapi-sequelize'].db.sequelize.models));

      server.ext('onPreHandler', function (sequelize) {
        return function (request, reply) {
          request.sequelize = sequelize;
          //console.log(modelCollections);
          reply.continue();
        }
      }(server.plugins['hapi-sequelize'].db.sequelize));

      console.log("Modules loaded are ", server.plugins['hapi-sequelize'].db.sequelize.models);

      server.route(routes);
      next();
    } else {
      throw err;
    }
  }
              );
}

register.attributes = {
  name: 'Flow Api',
  version: '1.0.0'
};

module.exports = register;
