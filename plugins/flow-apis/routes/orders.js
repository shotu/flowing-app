/**
 * Created by swapnil on 05/03/16.
 */
'use strict';

const ordersController = require('../controllers/orders');
const joi = require('joi');


module.exports = [

  {
    method: "POST",
    path: "/v1/orders",
    config: {
      handler: ordersController.sayHello,
      description: 'Create a Order',
      tags: ['api', 'orders'],
      plugins: {
        'hapi-swagger': {
          order: 1,
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
