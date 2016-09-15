/**
 * Created by swapnil on 28/03/16.
 */

var logger = require('./logger-utils').logger;
var Boom = require('boom');

module.exports = {

  handleResponse: function (err, data, reply) {
    if (err) {
      logger.error(err);
      logger.error(err.stack);
      var error;
      if (data && data.status) {
        error = Boom.create(data.status,err, {code:data.code, data: data.data}); // To send different status code for error send back response with data as := data = {status:"conflict",data:{message:"changed"}}
      } else {
        error = Boom.badRequest(err, data);
      }
      error.message = err.message;
      error.output.payload.message = err.message;
      error.output.payload.details = error.data;
      reply(error);
    } else {
      reply(data);
    }
  }
}