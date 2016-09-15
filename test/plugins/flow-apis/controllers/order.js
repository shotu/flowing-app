/**
 * Created by ashish on 16/03/16.
 */

const chai = require('chai');
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const expect = chai.expect;
const sqlizr = require('sqlizr');
const sinon = require('sinon');
const config = require('../../../../config');
const rewire = require('rewire');
var Sequelize = require('sequelize');

var orderController, sequelize, models;

describe("order controller", function () {
  beforeEach(function () {
    orderController = rewire("../../../../plugins/flow-apis/controllers/orders");
    sequelize = new Sequelize("test", "test", "test", {dialect: 'mysql'});
    models = sqlizr(sequelize, "plugins/flow-apis/models/mysql/*.js");

    sequelize = {
      transaction: function (otherFunction) {
        return new Promise(function (resolve, reject) {
          try {
            resolve(otherFunction("dummy"));
          } catch (err) {
            reject(err);
          }
        });
      }
    }
  });

  /**
   * get order test cases
   */

  describe('get order test cases', function () {
    beforeEach(function () {
      orderObj = {
        "id": 1,
        "customerDetailId": 1,
        "sourceDetailId": 1,
        "value": 100,
        "collectableAmount": 120.97,
        "merchantId": 123,
        "merchantLocationId": "456",
        "merchantTrackingId": "BLR1010",
        "trackingId": "CHENNAI1010",
        "reason": null,
        "deliverBy": null,
        "pincode": null,
        "externalGeoLayerId": null,
        "absWeight": 5.5,
        "volWeight": 1.2,
        "type": "large",
        "customerDetail": {
          "id": 1,
          "name": "someName",
          "phone": "1234567890",
          "email": "ashish.goswami@opinioapp.com",
          "addressId": "5701657c0d912413968d6e77"
        },
        "sourceDetail": {
          "id": 1,
          "name": "someName",
          "phone": "1234567890",
          "addressId": "5701657c0d912413968d6e79"
        }
      }
      request = {
        models: {},
        sequelize: {},
        params: {
          id: 1
        }
      }
    })

    /**
     * get order by id test cases
     */
    describe("#getOrderById", function () {
      it("should have status code as 200 for success with order attributes as response", function (done) {
        var service = {
          getOrderById: function (models, id, callback) {
            expect(id).to.equal(1);
            callback(null, orderObj);
          }
        };

        orderController.__set__('orderService', service);
        orderController.getOrderById(request, function (data) {
          expect(data).to.eql(orderObj);
          done();
        });
      });

      it("should have status code as 200 for success with null as response", function (done) {
        var service = {
          getOrderById: function (models, id, callback) {
            expect(id).to.equal(1);
            callback(null, null);
          }
        };
        orderController.__set__('orderService', service);
        orderController.getOrderById(request, function (data) {
          expect(data).to.eql(null);
          done();
        });
      });

      it("should have status code as 400 with error response", function (done) {
        var service = {
          getOrderById: function (models, id, callback) {
            expect(id).to.equal(1);
            callback(new Error("some db error"), null);
          }
        };
        orderController.__set__('orderService', service);
        orderController.getOrderById(request, function (data) {
          expect(data.output.statusCode).to.eql(400);
          done();
        });
      });
    });

    /**
     * get order by internal tracking id test cases
     */
    describe("#getOrderByInternalTrackingId", function () {
      it("should have status code as 200 for success with order attributes as response", function (done) {
        var service = {
          getOrderByInternalTrackingId: function (models, id, callback) {
            expect(id).to.equal(1);
            callback(null, orderObj);
          }
        };

        orderController.__set__('orderService', service);
        orderController.getOrderByInternalTrackingId(request, function (data) {
          expect(data).to.eql(orderObj);
          done();
        });
      });

      it("should have status code as 200 for success with null as response", function (done) {
        var service = {
          getOrderByInternalTrackingId: function (models, id, callback) {
            expect(id).to.equal(1);
            callback(null, null);
          }
        };
        orderController.__set__('orderService', service);
        orderController.getOrderByInternalTrackingId(request, function (data) {
          expect(data).to.eql(null);
          done();
        });
      });

      it("should have status code as 400 with error response", function (done) {
        var service = {
          getOrderByInternalTrackingId: function (models, id, callback) {
            expect(id).to.equal(1);
            callback(new Error("some db error"), null);
          }
        };
        orderController.__set__('orderService', service);
        orderController.getOrderByInternalTrackingId(request, function (data) {
          expect(data.output.statusCode).to.eql(400);
          done();
        });
      });
    });


    /**
     * get order by merchant tracking id test cases
     */
    describe("#getOrderByMerchantTrackingId", function () {
      it("should have status code as 200 for success with order attributes as response", function (done) {
        var service = {
          getOrderByMerchantTrackingId: function (models, id, callback) {
            expect(id).to.equal(1);
            callback(null, orderObj);
          }
        };

        orderController.__set__('orderService', service);
        orderController.getOrderByMerchantTrackingId(request, function (data) {
          expect(data).to.eql(orderObj);
          done();
        });
      });

      it("should have status code as 200 for success with null as response", function (done) {
        var service = {
          getOrderByMerchantTrackingId: function (models, id, callback) {
            expect(id).to.equal(1);
            callback(null, null);
          }
        };
        orderController.__set__('orderService', service);
        orderController.getOrderByMerchantTrackingId(request, function (data) {
          expect(data).to.eql(null);
          done();
        });
      });

      it("should have status code as 400 with error response", function (done) {
        var service = {
          getOrderByMerchantTrackingId: function (models, id, callback) {
            expect(id).to.equal(1);
            callback(new Error("some db error"), null);
          }
        };
        orderController.__set__('orderService', service);
        orderController.getOrderByMerchantTrackingId(request, function (data) {
          expect(data.output.statusCode).to.eql(400);
          done();
        });
      });
    });

  })

  /**
   * create order test cases
   */

  describe('order creation test cases', function () {

    /**
     * create single order test cases
     */

    describe('#createOrder', function () {
      beforeEach(function () {
        request = {
          models: models,
          sequelize: sequelize,
          payload: {
            merchantTrackingId: 'BLR1010',
            value: 100.00
          }
        }

        orderObj = {
          id: 1,
          merchantTrackingId: 'BLR1010',
          value: 100.00
        }
      })

      it('should return 201 response with created object', function (done) {
        var service = {
          createOrder: function (models, payload, sequelize, callback) {
            expect(payload.merchantTrackingId).to.equal('BLR1010');
            expect(payload.value).to.equal(100.00);
            callback(null, orderObj);
          }
        }

        orderController.__set__('orderService', service);
        orderController.createOrder(request, function (data) {
          expect(data.id).to.equal(1);
          expect(data.merchantTrackingId).to.equal('BLR1010');
          expect(data.value).to.equal(100.00);
          return {
            created: function (url) {
              expect(url).to.equal('/v1/orders/' + data.id);
              done();
            }
          }
        })
      })

      it('should return 400 response with error', function (done) {
        var service = {
          createOrder: function (models, payload, sequelize, callback) {
            expect(payload.merchantTrackingId).to.equal('BLR1010');
            expect(payload.value).to.equal(100.00);
            callback(new Error('timeout error'), null);
          }
        }

        orderController.__set__('orderService', service);
        orderController.createOrder(request, function (data) {
          expect(data.output.statusCode).to.equal(400);
          done();
        })
      })
    })

    /**
     * create orders in bulk test cases
     */

    describe('#createOrderInBulk', function () {
      beforeEach(function () {
        request = {
          models: {},
          sequelize: {},
          payload: {
            orders: [
              {
                merchantTrackingId: 'BLR1010'
              },
              {
                merchantTrackingId: 'BLR0101'
              }
            ]
          }
        }

        successPayload = {
          orders: [
            {
              merchantTrackingId: 'BLR1010',
              status: 'order successfully created',
              order: {
                id: 1,
                merchantTrackingId: 'BLR1010'
              }
            },
            {
              merchantTrackingId: 'BLR0101',
              status: 'order creation failed',
              error: {
                message: 'merchant id cannot be found from merchant code'
              }
            }
          ]
        }
      })

      it('should return successful response', function (done) {
        var service = {
          createOrdersInBulk: function (models, payload, sequelize, callback) {
            expect(payload.orders[0].merchantTrackingId).to.equal('BLR1010');
            expect(payload.orders[1].merchantTrackingId).to.equal('BLR0101');
            callback(null, successPayload);
          }
        }

        orderController.__set__('orderService', service);
        orderController.createOrdersInBulk(request, function (data) {
          expect(data.orders[0].merchantTrackingId).to.equal('BLR1010');
          expect(data.orders[0].status).to.equal('order successfully created');
          expect(data.orders[0].order.id).to.equal(1);
          expect(data.orders[1].merchantTrackingId).to.equal('BLR0101');
          expect(data.orders[1].status).to.equal('order creation failed');
          expect(data.orders[1].error.message).to.equal('merchant id cannot be found from merchant code');
          done();
        })

      })

      it('should return internal server error', function (done) {
        var service = {
          createOrdersInBulk: function (models, payload, sequelize, callback) {
            expect(payload.orders[0].merchantTrackingId).to.equal('BLR1010');
            expect(payload.orders[1].merchantTrackingId).to.equal('BLR0101');
            callback(new Error('internal server error'));
          }
        }

        orderController.__set__('orderService', service);
        orderController.createOrdersInBulk(request, function (data) {
          expect(data.output.statusCode).to.equal(400);
          done();
        })
      })
    })
  })

  /**
   * update order test cases
   */

  describe('update order test cases', function () {
    beforeEach(function () {
      request = {
        models: {},
        params: {
          id: 1
        },
        payload: {
          value: 50.00,
          merchantId: 10
        }
      }

      successMessage = {
        message: 'order successfully updated'
      }
    })

    /**
     * update order by id test cases
     */
    describe('#updateOrderById', function () {

      it("should return successful update response", function (done) {
        var service = {
          updateOrderById: function (models, id, payload, callback) {
            expect(id).to.equal(1);
            expect(payload.value).to.equal(50.00);
            callback(null, successMessage);
          }
        }

        orderController.__set__('orderService', service);
        orderController.updateOrderById(request, function (data) {
          expect(data).to.equal(successMessage);
          done();
        })
      })

      it('should return no id found response', function (done) {
        var service = {
          updateOrderById: function (models, id, payload, callback) {
            expect(id).to.equal(1);
            expect(payload.value).to.equal(50.00);
            callback(null, {
              message: 'no order found with id ' + id
            })
          }
        }

        orderController.__set__('orderService', service);
        orderController.updateOrderById(request, function (data) {
          expect(data.message).to.equal('no order found with id ' + request.params.id);
          done();
        })
      })

      it('should return timeout error', function (done) {
        var service = {
          updateOrderById: function (models, id, payload, callback) {
            expect(id).to.equal(1);
            expect(payload.value).to.equal(50.00);
            callback(new Error('timeout error'));
          }
        }

        orderController.__set__('orderService', service);
        orderController.updateOrderById(request, function (data) {
          expect(data.output.statusCode).to.equal(400);
          done();
        })
      })
    })

    /**
     * update order by internal tracking id test cases
     */
    describe('#updateOrderByInternalTrackingId', function () {

      it("should return successful update response", function (done) {
        var service = {
          updateOrderByInternalTrackingId: function (models, id, payload, callback) {
            expect(id).to.equal(1);
            expect(payload.value).to.equal(50.00);
            callback(null, successMessage);
          }
        }

        orderController.__set__('orderService', service);
        orderController.updateOrderByInternalTrackingId(request, function (data) {
          expect(data).to.equal(successMessage);
          done();
        })
      })

      it('should return no id found response', function (done) {
        var service = {
          updateOrderByInternalTrackingId: function (models, id, payload, callback) {
            expect(id).to.equal(1);
            expect(payload.value).to.equal(50.00);
            callback(null, {
              message: 'no order found with id ' + id
            })
          }
        }

        orderController.__set__('orderService', service);
        orderController.updateOrderByInternalTrackingId(request, function (data) {
          expect(data.message).to.equal('no order found with id ' + request.params.id);
          done();
        })
      })

      it('should return timeout error', function (done) {
        var service = {
          updateOrderByInternalTrackingId: function (models, id, payload, callback) {
            expect(id).to.equal(1);
            expect(payload.value).to.equal(50.00);
            callback(new Error('timeout error'));
          }
        }

        orderController.__set__('orderService', service);
        orderController.updateOrderByInternalTrackingId(request, function (data) {
          expect(data.output.statusCode).to.equal(400);
          done();
        })
      })
    })
  })
})
