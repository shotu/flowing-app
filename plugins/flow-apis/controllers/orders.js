/**
 * Created by swapnil on 12/03/16.
 */
'use strict';

var orderService = require('../services/orders');
var boom = require('boom');
var internalTrackingId = 'internalTrackingId';
var merchantTrackingId = 'merchantTrackingId';
const responseHandler = require('../utils/response-handler');

module.exports = {



  sayHello: function (request, reply) {
    orderService.sayHello(request.models, request.payload, request.sequelize, function (err, createdObjects) {
      if (err) {
        reply(boom.badRequest(err));
      } else {
        reply(createdObjects);
      }
    })
  }
}
