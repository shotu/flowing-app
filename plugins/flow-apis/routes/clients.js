
'use strict';

const clientsController = require('../controllers/clients');
const joi = require('joi');


module.exports = [

  {
    method: "POST",
    path: "/v1/hello",
    config: {
      handler: clientsController.sayHello,
      description: 'Create a Order',
      tags: ['api', 'orders'],
      plugins: {
        'hapi-swagger': {
          responses: {
            '200': {
              'description': 'Success',
              'schema': joi.object({
                id: joi.number().integer().example(1)
              }).label('Result')
            },
            '400': {'description': 'Bad Request'}
          }
        }
      },
      validate: {
        payload: joi.object({

        })
      }
    }
  }




];
