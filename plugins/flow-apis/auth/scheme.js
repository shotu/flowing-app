'use strict';

// Load modules

const Boom = require('boom');
const Hoek = require('hoek');
const logger = require('../utils/logger-utils').logger;
// Declare internals

const internals = {};


exports.register = function (plugin, options, next) {

  plugin.auth.scheme('auth-token', internals.implementation);
  next();
};


exports.register.attributes = {
  name: 'hapi Token based auth plugin',
  version: '1.0.0'
};

internals.implementation = function (server, options) {
  Hoek.assert(options, 'Missing token-based auth strategy options');
  Hoek.assert(typeof options.validateFunc === 'function', 'options.validateFunc must be a valid function in token scheme');

  const settings = Hoek.clone(options);

  return {
    authenticate: function (request, reply,next) {

      const token = request.headers.authorization;
      //const path = req.path;
      if (!token) {
        return reply(Boom.unauthorized("Unauthorized... !"));
      }


      settings.validateFunc(token)
        .then(function(success){

          var createNamespace = require('continuation-local-storage').createNamespace;
          var writer = createNamespace('flo-auth-session');

          writer.run(function () {
            writer.set('authorization', token);

            reply.continue({credentials:{token:token}});
          });

        })
        .catch(function(err){
          logger.error(err);
          reply(Boom.unauthorized("Unauthorized... !"));
        });
    }
  };
};