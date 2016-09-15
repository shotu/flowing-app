
'use strict';

var clientService = require('../services/clients');
var boom = require('boom');
var internalTrackingId = 'internalTrackingId';
var merchantTrackingId = 'merchantTrackingId';
const responseHandler = require('../utils/response-handler');

module.exports = {
  sayHello: function (request, reply) {
    clientService.sayHello(request.models, request.payload, request.sequelize, function (err, createdObjects) {
      if (err) {
        reply(boom.badRequest(err));
      } else {
        reply(createdObjects);
      }
    })
  }
}
