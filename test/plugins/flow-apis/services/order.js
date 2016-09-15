/**
 * Created by ashish on 21/03/16.
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
var Promise = require('bluebird');
var status = require('../../../../plugins/oms-apis/utils/status-utils')
const constants = require('../../../../plugins/oms-apis/utils/constants');
var request;
var orderService, sequelize, models;
describe("order management service", function () {
  beforeEach(function () {
    orderService = rewire("../../../../plugins/oms-apis/services/orders");

    sequelize = new Sequelize("test", "test", "test", {dialect: 'mysql'});
    request = {
      models: sqlizr(sequelize, "plugins/oms-apis/models/mysql/*.js"),
    }

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
  describe("get order by different test cases", function () {

    beforeEach(function () {
      orderId = 10;
      internalTrackingId = 'BLR1010';
      merchantTrackingId = 'BLR0101';
      orderObj = {
        id: 10,
        internalTrackingId: 'BLR1010',
        merchantTrackingId: 'BLR0101'
      }
    })
    /**
     * get order by order id test cases
     */
    describe("#getOrderById", function () {
      it("should return a order object", function (done) {
        sinon.stub(request.models.order, "findById", function (id) {
          expect(id).to.equal(orderId);
          return Promise.resolve(orderObj);
        });
        orderService.getOrderById(request.models, orderId, function (err, data) {
          expect(data.internalTrackingId).to.equal(internalTrackingId);
          done();
        });
      });

      it("should return error when db throws error", function (done) {

        sinon.stub(request.models.order, "findById", function (id) {
          expect(id).to.equal(orderId);
          return Promise.reject(new Error("timeout error"));
        });

        orderService.getOrderById(request.models, orderId, function (err, data) {
          expect(data).to.equal(undefined);
          expect(err.message).to.equal("timeout error");
          done();
        })
      });
    });


    /**
     * get order by internal tracking id test cases
     */
    describe("#getorderByInternalTrackingId", function () {
      it("should return a order object", function (done) {
        stub = sinon.stub(request.models.order, "findOne", function (payload) {
          expect(payload.where.trackingId).to.equal(internalTrackingId)
          return Promise.resolve(orderObj);
        });
        orderService.getOrderByInternalTrackingId(request.models, internalTrackingId, function (err, data) {
          expect(data.id).to.equal(orderId);
          done();
        });
      });

      it("should return error when db throws error", function (done) {

        stub = sinon.stub(request.models.order, "findOne", function (payload) {
          expect(payload.where.trackingId).to.equal(internalTrackingId)
          return Promise.reject(new Error("timeout error"));
        });

        orderService.getOrderByInternalTrackingId(request.models, internalTrackingId, function (err, data) {
          expect(data).to.equal(undefined);
          expect(err.message).to.equal("timeout error");
          done();
        })
      });
    });


    /**
     * get order by merchant tracking id test cases
     */
    describe("#getOrderByMerchantTrackingId", function () {
      it("should return a status object", function (done) {
        stub = sinon.stub(request.models.order, "findOne", function (payload) {
          expect(payload.where.merchantTrackingId).to.equal(merchantTrackingId);
          return Promise.resolve(orderObj);
        });
        orderService.getOrderByMerchantTrackingId(request.models, merchantTrackingId, function (err, data) {
          expect(data.id).to.equal(orderId);
          done();
        });
      });

      it("should return error when db throws error", function (done) {

        stub = sinon.stub(request.models.order, "findOne", function (payload) {
          expect(payload.where.merchantTrackingId).to.equal(merchantTrackingId);
          return Promise.reject(new Error("timeout error"));
        });
        orderService.getOrderByMerchantTrackingId(request.models, merchantTrackingId, function (err, data) {
          expect(data).to.equal(undefined);
          expect(err.message).to.equal("timeout error");
          done();
        })
      });
    });
  })

  /**
   * update order test cases
   */
  describe('update order by id and internal tracking id test cases', function () {

    beforeEach(function () {
      payload = {
        trackingId: 'BLR0101',
        type: 'small'
      };

      orderId = 10;
      internalTrackingId = 'BLR1010';
    })
    /**
     * update order by order id test cases
     */
    describe("#updateOrderById", function () {
      it("should return success message", function (done) {
        stub = sinon.stub(request.models.order, "update", function (payload, whereCondition) {
          expect(whereCondition.where.id).to.equal(orderId);
          return Promise.resolve([1]);
        });
        orderService.updateOrderById(request.models, orderId, payload, function (err, data) {
          expect(data.message).to.equal("order updated successfully");
          done();
        });
      });

      it("should return error where there is no order with given id", function (done) {
        stub = sinon.stub(request.models.order, "update", function (payload, whereCondition) {
          expect(whereCondition.where.id).to.equal(orderId);
          return Promise.resolve([0]);
        });
        orderService.updateOrderById(request.models, orderId, payload, function (err, data) {
          expect(err.message).to.equal("no order found for id " + orderId);
          done();
        });
      });

      it("should return error when db throws error", function (done) {

        sinon.stub(request.models.order, "update", function (payload, whereCondition) {
          expect(whereCondition.where.id).to.equal(orderId);
          return Promise.reject(new Error("timeout error"));
        });

        orderService.updateOrderById(request.models, orderId, payload, function (err, data) {
          expect(data).to.equal(undefined);
          expect(err.message).to.equal("timeout error");
          done();
        })
      });
    });

    /**
     * update order by internal tracking id test cases
     */
    describe("#updateOrderByInternalTrackingId", function () {
      it("should return success message", function (done) {
        stub = sinon.stub(request.models.order, "update", function (payload, whereCondition) {
          expect(whereCondition.where.trackingId).to.equal(internalTrackingId);
          return Promise.resolve([1]);
        });
        orderService.updateOrderByInternalTrackingId(request.models, internalTrackingId, payload, function (err, data) {
          expect(data.message).to.equal("order updated successfully");
          done();
        });
      });

      it("should return error where there is no order with given tracking id", function (done) {

        stub = sinon.stub(request.models.order, "update", function (payload, whereCondition) {
          expect(whereCondition.where.trackingId).to.equal(internalTrackingId);
          return Promise.resolve([0]);
        });

        orderService.updateOrderByInternalTrackingId(request.models, internalTrackingId, payload, function (err, data) {
          expect(data).to.equal(undefined);
          expect(err.message).to.equal("no order found for tracking id " + internalTrackingId);
          done();
        })
      });
    });

    it("should return error when db throws error", function (done) {

      sinon.stub(request.models.order, "update", function (payload, whereCondition) {
        expect(whereCondition.where.trackingId).to.equal(internalTrackingId);
        return Promise.reject(new Error("timeout error"));
      });

      orderService.updateOrderByInternalTrackingId(request.models, internalTrackingId, payload, function (err, data) {
        expect(data).to.equal(undefined);
        expect(err.message).to.equal("timeout error");
        done();
      })
    });

  })
  /**
   * create Order test cases
   */

  describe('#createOrder', function () {

    beforeEach(function () {
      requestPayload = {
        "customerDetail": {
          "name": "someName",
          "phone": "1234567890",
          "email": "some_email@opinioapp.com",
          "address": {
            "type": "residential",
            "flatNo": 101,
            "addressLine1": "address line 1",
            "addressLine2": "address line 2",
            "city": "bangalore",
            "pincode": "560027",
            "landmark": "landmark"
          }
        },
        "merchantCode": "MER01",
        "merchantLocationCode": "LOC1010",
        "merchantTrackingId": "BLR1010",
        "absWeight": 5.5,
        "value": 100,
        "collectableAmount": 120.97,
        "volWeight": 1.2,
        "type": "large",
        "items": [
          {
            "description": "this is a book",
            "type": "not fragile",
            "unitPrice": 45,
            "quantity": 2

          }
        ],
        "attributes": {
          "length": "15",
          "breadth": "10.54",
          "height": "3.456"
        },
        "sourceDetail": {
          "name": "someName",
          "phone": "1234567890",
          "address": {
            "type": "residential",
            "flatNo": 101,
            "addressLine1": "source address line 1",
            "addressLine2": "source address line 2",
            "city": "bangalore",
            "pincode": "560027",
            "landmark": "source landmark"
          }
        }
      };

      successPayload = {
        "active": true,
        "version": 0,
        "id": 25,
        "customerDetail": {
          "id": 25,
          "name": "someName",
          "phone": "1234567890",
          "email": "some_email@opinioapp.com",
          "addressId": "5704ea0b8e8fd27d07bc7668"
        },
        "merchantTrackingId": "BLR1010",
        "absWeight": 5.5,
        "value": 100,
        "collectableAmount": 120.97,
        "volWeight": 1.2,
        "type": "large",
        "items": [
          {
            "id": 25,
            "type": "not fragile",
            "unitPrice": 45,
            "quantity": 2,
            "orderId": 25
          }
        ],
        "attributes": [
          {
            "id": 73,
            "key": "length",
            "value": "15",
            "orderId": 25
          },
          {
            "id": 74,
            "key": "breadth",
            "value": "10.54",
            "orderId": 25
          },
          {
            "id": 75,
            "key": "height",
            "value": "3.456",
            "orderId": 25
          }
        ],
        "sourceDetail": {
          "id": 25,
          "name": "someName",
          "phone": "1234567890",
          "addressId": "5704ea0b8e8fd27d07bc766a"
        },
        "merchantId": 123,
        "merchantLocationId": 456,
        "status": {
          "id": 9,
          "status": "created",
          "currentLocation": "origin",
          "orderId": 25
        },
        "customerDetailId": 25,
        "sourceDetailId": 25
      }
    })

    it('should return order object after successful creation', function (done) {

      var googleService = {
        resolveGoogleLatLng: function (orderId, addressPayload) {
          expect(orderId).to.equal(25);
          expect(addressPayload.address).to.eql(requestPayload.customerDetail.address);
          return Promise.resolve("");
        }
      }

      var OCUtil = {
        validateMerchantCodeAndLocationCode: function (merchantCode, merchantLocationCode) {
          expect(merchantCode).to.equal("MER01");
          expect(merchantLocationCode).to.equal("LOC1010");
          return Promise.resolve({merchantId: 1, merchantLocationId: 1});
        },

        postAddressToAddressService: function (payload) {
          return Promise.resolve([{"customerAddress": "ID1"}, {"sourceAddress": "ID2"}]);
        },

        processPayloadForOrderCreation: function (models, t, payload, orderPayload) {
          return Promise.resolve(successPayload);
        },

        getAttributeArrayFromAttributeObj: function (attributeObj) {
          return Promise.resolve([
              {
                "key": "length",
                "value": 1
              }
            ]
          );
        },

        validateMerchantTrackingId: function(models, orderPayload) {
          return Promise.resolve(null);
        },

        checkPincodeServiceability: function(pincode) {
          expect(pincode).to.equal(requestPayload.customerDetail.address.pincode);
          return Promise.resolve("");
        }
      }
      orderService.__set__('orderCreationUtils', OCUtil);
      orderService.__set__('googleLatLngResolve', googleService);

      orderService.createOrder(request.models, requestPayload, "transaction", function (err, result) {
        expect(result.id).to.equal(25);
        expect(result.status.status).to.equal('created');
        done();
      })
    })

    it('should throw error when validateMerchantCodeAndLocationCode fails', function (done) {

      var googleService = {
        resolveGoogleLatLng: function (orderId, addressPayload) {
          expect(orderId).to.equal(25);
          expect(addressPayload).to.equal.deep(requestPayload.customerDetail);
          return Promise.resolve("");
        }
      }

      var OCUtil = {
        validateMerchantCodeAndLocationCode: function (merchantCode, merchantLocationCode) {
          expect(merchantCode).to.equal("MER01");
          expect(merchantLocationCode).to.equal("LOC1010");
          return Promise.reject(new Error("networkFailure"));
        },

        postAddressToAddressService: function (payload) {
          return Promise.resolve([{"customerAddress": "ID1"}, {"sourceAddress": "ID2"}]);
        },

        processPayloadForOrderCreation: function (models, t, payload, orderPayload) {
          return Promise.resolve(successPayload);
        },

        getAttributeArrayFromAttributeObj: function (attributeObj) {
          return Promise.resolve([
              {
                "key": "length",
                "value": 1
              }
            ]
          );
        },

        validateMerchantTrackingId: function(models, orderPayload) {
          return Promise.resolve(null);
        },

        checkPincodeServiceability: function(pincode) {
          expect(pincode).to.equal(requestPayload.customerDetail.address.pincode);
          return Promise.resolve("");
        }
      }
      orderService.__set__('orderCreationUtils', OCUtil);
      orderService.__set__('googleLatLngResolve', googleService);

      orderService.createOrder(request.models, requestPayload, sequelize, function (err, result) {
        expect(err.message).to.equal('networkFailure');
        done();
      })
    });

    it('should throw error when call to post address method fails', function (done) {

      var googleService = {
        resolveGoogleLatLng: function (orderId, addressPayload) {
          expect(orderId).to.equal(25);
          expect(addressPayload).to.equal.deep(requestPayload.customerDetail);
          return Promise.resolve("");
        }
      }

      var OCUtil = {
        validateMerchantCodeAndLocationCode: function (merchantCode, merchantLocationCode) {
          expect(merchantCode).to.equal("MER01");
          expect(merchantLocationCode).to.equal("LOC1010");
          return Promise.resolve({merchantId: 1, merchantLocationId: 1});
        },

        postAddressToAddressService: function (payload) {
          return Promise.reject(new Error("networkFailure"));
        },

        processPayloadForOrderCreation: function (models, t, payload, orderPayload) {
          return Promise.resolve(successPayload);
        },

        getAttributeArrayFromAttributeObj: function (attributeObj) {
          return Promise.resolve([
              {
                "key": "length",
                "value": 1
              }
            ]
          );
        },

        validateMerchantTrackingId: function(models, orderPayload) {
          return Promise.resolve(null);
        },

        checkPincodeServiceability: function(pincode) {
          expect(pincode).to.equal(requestPayload.customerDetail.address.pincode);
          return Promise.resolve("");
        }
      }
      orderService.__set__('orderCreationUtils', OCUtil);
      orderService.__set__('googleLatLngResolve', googleService);

      orderService.createOrder(request.models, requestPayload, sequelize, function (err, result) {
        expect(err.message).to.equal('networkFailure');
        done();
      })
    })

    it('should fail if call to processPayloadForOrderCreation fails', function (done) {
      var googleService = {
        resolveGoogleLatLng: function (orderId, addressPayload) {
          expect(orderId).to.equal(25);
          expect(addressPayload).to.equal.deep(requestPayload.customerDetail);
          return Promise.resolve("");
        }
      }

      var OCUtil = {
        validateMerchantCodeAndLocationCode: function (merchantCode, merchantLocationCode) {
          expect(merchantCode).to.equal("MER01");
          expect(merchantLocationCode).to.equal("LOC1010");
          return Promise.resolve({merchantId: 1, merchantLocationId: 1});
        },

        postAddressToAddressService: function (payload) {
          return Promise.resolve([{"customerAddress": "ID1"}, {"sourceAddress": "ID2"}]);
        },

        processPayloadForOrderCreation: function (models, t, payload, orderPayload) {
          return Promise.reject(new Error("timeout"));
        },

        getAttributeArrayFromAttributeObj: function (attributeObj) {
          return Promise.resolve([
              {
                "key": "length",
                "value": 1
              }
            ]
          );
        },

        validateMerchantTrackingId: function(models, orderPayload) {
          return Promise.resolve(null);
        },

        checkPincodeServiceability: function(pincode) {
          expect(pincode).to.equal(requestPayload.customerDetail.address.pincode);
          return Promise.resolve("");
        }
      }
      orderService.__set__('orderCreationUtils', OCUtil);
      orderService.__set__('googleLatLngResolve', googleService);

      orderService.createOrder(request.models, requestPayload, sequelize, function (err, result) {
        expect(err.message).to.equal('timeout');
        done();
      })
    })


    it('should fail if call to validate merchant tracking id fails', function (done) {
      var googleService = {
        resolveGoogleLatLng: function (orderId, addressPayload) {
          expect(orderId).to.equal(25);
          expect(addressPayload).to.equal.deep(requestPayload.customerDetail);
          return Promise.resolve("");
        }
      }

      var OCUtil = {
        validateMerchantCodeAndLocationCode: function (merchantCode, merchantLocationCode) {
          expect(merchantCode).to.equal("MER01");
          expect(merchantLocationCode).to.equal("LOC1010");
          return Promise.resolve({merchantId: 1, merchantLocationId: 1});
        },

        postAddressToAddressService: function (payload) {
          return Promise.resolve([{"customerAddress": "ID1"}, {"sourceAddress": "ID2"}]);
        },

        processPayloadForOrderCreation: function (models, t, payload, orderPayload) {
          return Promise.reject(new Error("timeout"));
        },

        getAttributeArrayFromAttributeObj: function (attributeObj) {
          return Promise.resolve([
              {
                "key": "length",
                "value": 1
              }
            ]
          );
        },

        validateMerchantTrackingId: function(models, orderPayload) {
          return Promise.reject(new Error(constants.duplicateMerchantTrackingIdError));
        },

        checkPincodeServiceability: function(pincode) {
          expect(pincode).to.equal(requestPayload.customerDetail.address.pincode);
          return Promise.resolve("");
        }
      }
      orderService.__set__('orderCreationUtils', OCUtil);
      orderService.__set__('googleLatLngResolve', googleService);

      orderService.createOrder(request.models, requestPayload, sequelize, function (err, result) {
        expect(err.message).to.equal(constants.duplicateMerchantTrackingIdError);
        done();
      })
    })

    it('should fail if call to pincode is not served ', function (done) {
      var googleService = {
        resolveGoogleLatLng: function (orderId, addressPayload) {
          expect(orderId).to.equal(25);
          expect(addressPayload).to.equal.deep(requestPayload.customerDetail);
          return Promise.resolve("");
        }
      }

      var OCUtil = {
        validateMerchantCodeAndLocationCode: function (merchantCode, merchantLocationCode) {
          expect(merchantCode).to.equal("MER01");
          expect(merchantLocationCode).to.equal("LOC1010");
          return Promise.resolve({merchantId: 1, merchantLocationId: 1});
        },

        postAddressToAddressService: function (payload) {
          return Promise.resolve([{"customerAddress": "ID1"}, {"sourceAddress": "ID2"}]);
        },

        processPayloadForOrderCreation: function (models, t, payload, orderPayload) {
          return Promise.reject(new Error("timeout"));
        },

        getAttributeArrayFromAttributeObj: function (attributeObj) {
          return Promise.resolve([
              {
                "key": "length",
                "value": 1
              }
            ]
          );
        },

        validateMerchantTrackingId: function(models, orderPayload) {
          return Promise.resolve(null);
        },

        checkPincodeServiceability: function(pincode) {
          expect(pincode).to.equal(requestPayload.customerDetail.address.pincode);
          return Promise.reject(new Error(constants.pincodeNotServiceableError));
        }
      }
      orderService.__set__('orderCreationUtils', OCUtil);
      orderService.__set__('googleLatLngResolve', googleService);

      orderService.createOrder(request.models, requestPayload, sequelize, function (err, result) {
        expect(err.message).to.equal(constants.pincodeNotServiceableError);
        done();
      })
    })
  })

  /**
   * create orders in bulk test cases
   */
  describe('#createOrdersInBulk', function () {
    beforeEach(function () {
      requestPayload = {
        orders: [
          {
            merchantTrackingId: 'BLR1010',
            collectableAmount: 500.1234
          },
          {
            merchantTrackingId: 'MAS1010',
            value: 1000.00
          }
        ]
      }

      successPayload = {
        orders: [
          {
            merchantTrackingId: 'BLR1010',
            status: 'order successfully created',
            order: {
              id: 1,
              collectableAmount: 500.1234
            }
          },
          {
            merchantTrackingId: 'MAS1010',
            status: 'order successfully created',
            order: {
              id: 2,
              value: 1000.00
            }
          }
        ]
      }
    })

    it('should return success payload', function (done) {
      var createOrder = function (models, item, transaction, callback) {
        item.id = Math.floor((Math.random() * 10) + 1);
        callback(null, item);
      };
      orderService.__set__('createOrder', createOrder);


      orderService.createOrdersInBulk(request.models, requestPayload, sequelize, function (err, result) {
        console.log('************', result);
        expect(result.orders[0].status).to.equal('success');
        expect(result.orders[0].merchantTrackingId).to.equal("BLR1010");
        expect(result.orders[1].status).to.equal('success');
        expect(result.orders[1].merchantTrackingId).to.equal("MAS1010");
        done();
      })
    })

    it('should return error response', function (done) {

      var createOrder = function (models, item, transaction, callback) {
        callback(new Error('timeout error'));
      };
      orderService.__set__('createOrder', createOrder);

      orderService.createOrdersInBulk(request.models, requestPayload, sequelize, function (err, result) {
        console.log(err);
        console.log(result);
        expect(result.orders[0].status).to.equal('failure');
        expect(result.orders[0].merchantTrackingId).to.equal("BLR1010");
        expect(result.orders[1].status).to.equal('failure');
        expect(result.orders[1].merchantTrackingId).to.equal("MAS1010");
        done();
      })
    })
  })

  describe("#createOrderViaXls", function () {
    it("should successfully created order and update status of order to success", function (done) {
      var orderRawPayload = {
        merchantTrackingId: "BLR1010",
        xlsUploadId: 1,
        value: 100
      };

      var orderSuccessPayload = {
        id: 1,
        merchantTrackingId: "BLR1010",
        xlsUploadId: 1,
        value: 100
      };

      sinon.stub(request.models.orderToXlsUploadMapping, 'update', function (payload, whereCondition) {
        expect(payload.status).to.equal("success");
        expect(payload.orderId).to.equal(orderSuccessPayload.id);
        return Promise.resolve([1]);
      });

      var createOrder = function (models, payload, transaction, callback) {
        expect(payload.merchantTrackingId).to.equal(orderRawPayload.merchantTrackingId);
        callback(null, orderSuccessPayload);
      };

      orderService.__set__('createOrder', createOrder);
      orderService.createOrderViaXls(request.models, orderRawPayload, sequelize, function (err, result) {
        console.log(err);
        console.log(result);
        expect(result.message).to.equal("success");
        done();
      })
    })

    it("should update status of order if duplicate merchant tracking id is present in createOrder", function (done) {
      var orderRawPayload = {
        merchantTrackingId: "BLR1010",
        xlsUploadId: 1,
        value: 100
      };

      var orderSuccessPayload = {
        id: 1,
        merchantTrackingId: "BLR1010",
        xlsUploadId: 1,
        value: 100
      };

      sinon.stub(request.models.orderToXlsUploadMapping, 'update', function (payload, whereCondition) {
        expect(payload.status).to.equal("failed");
        expect(payload.reason).to.equal(constants.duplicateMerchantTrackingIdError);
        return Promise.resolve([1]);
      });

      var createOrder = function (models, payload, transaction, callback) {
        expect(payload.merchantTrackingId).to.equal(orderRawPayload.merchantTrackingId);
        callback(new Error(constants.duplicateMerchantTrackingIdError));
      };

      orderService.__set__('createOrder', createOrder);
      orderService.createOrderViaXls(request.models, orderRawPayload, sequelize, function (err, result) {
        console.log(err);
        console.log(result);
        expect(result.message).to.equal("success");
        done();
      })
    })

    it("should update status of order if pincode is not serviceable", function (done) {
      var orderRawPayload = {
        merchantTrackingId: "BLR1010",
        xlsUploadId: 1,
        value: 100
      };

      var orderSuccessPayload = {
        id: 1,
        merchantTrackingId: "BLR1010",
        xlsUploadId: 1,
        value: 100
      };

      sinon.stub(request.models.orderToXlsUploadMapping, 'update', function (payload, whereCondition) {
        expect(payload.status).to.equal("failed");
        expect(payload.reason).to.equal(constants.pincodeNotServiceableError);
        return Promise.resolve([1]);
      });

      var createOrder = function (models, payload, transaction, callback) {
        expect(payload.merchantTrackingId).to.equal(orderRawPayload.merchantTrackingId);
        callback(new Error(constants.pincodeNotServiceableError));
      };

      orderService.__set__('createOrder', createOrder);
      orderService.createOrderViaXls(request.models, orderRawPayload, sequelize, function (err, result) {
        console.log(err);
        console.log(result);
        expect(result.message).to.equal("success");
        done();
      })
    })

    it("should fail if there is any other error than duplicate merchant tracking id error", function (done) {
      var orderRawPayload = {
        merchantTrackingId: "BLR1010",
        xlsUploadId: 1,
        value: 100
      };

      var orderSuccessPayload = {
        id: 1,
        merchantTrackingId: "BLR1010",
        xlsUploadId: 1,
        value: 100
      };

      sinon.stub(request.models.orderToXlsUploadMapping, 'update', function (payload, whereCondition) {
        expect(payload.status).to.equal("failed");
        expect(payload.reason).to.equal("some error");
        return Promise.resolve([1]);
      });

      var createOrder = function (models, payload, transaction, callback) {
        callback(new Error("some error"));
      };

      orderService.__set__('createOrder', createOrder);
      orderService.createOrderViaXls(request.models, orderRawPayload, sequelize, function (err, result) {
        console.log(err);
        console.log(result);
        expect(result.message).to.equal("success");
        done();
      })
    })

    it("should fail if order status updation fails", function (done) {
      var orderRawPayload = {
        merchantTrackingId: "BLR1010",
        xlsUploadId: 1,
        value: 100
      };

      var orderSuccessPayload = {
        id: 1,
        merchantTrackingId: "BLR1010",
        xlsUploadId: 1,
        value: 100
      };

      sinon.stub(request.models.orderToXlsUploadMapping, 'update', function (payload, whereCondition) {
        expect(payload.status).to.equal("failed");
        return Promise.reject(new Error("timeout"));
      });

      var createOrder = function (models, payload, transaction, callback) {
        expect(payload.merchantTrackingId).to.equal(orderRawPayload.merchantTrackingId);
        callback(null, orderSuccessPayload);
      };

      orderService.__set__('createOrder', createOrder);
      orderService.createOrderViaXls(request.models, orderRawPayload, sequelize, function (err, result) {
        console.log(err);
        console.log(result);
        expect(err.message).to.equal("timeout");
        done();
      })
    })
  })

  /**
   * test cases for markOrderOverage
   */
  describe("#markOrderOverage", function () {

    it("should throw an error if database throws an error while creating overage", function (done) {
      var payload ={
        merchantId:1,
        merchantTrackingId:"FLIP120",
        merchantName: "Flipkart",
        facilityId:1,
        status: status.overageStatus.created,
        type:"order",
        notes:"Overage marked while order in-scanning"
      }

      sinon.stub(request.models.overage,'create', function (options) {
        console.log("+++",options);
        expect(options.merchantId).to.equal(1);
        expect(options.merchantTrackingId).to.equal('FLIP120');
        expect(options.facilityId).to.equal(1);
        expect(options.status).to.equal(status.overageStatus.created);
        expect(options.type).to.equal('order');
        return Promise.reject(new Error("db is unable to create"))
        
      })

      orderService.markOrderOverage(request.models, payload, function (err,data) {
        expect(err.message).to.equal("db is unable to create");
        done();
      })

    })

    it("should successfully create overage", function (done) {
      var payload ={
        merchantId:1,
        merchantTrackingId:"FLIP120",
        merchantName: "Flipkart",
        facilityId:1,
        status: status.overageStatus.created,
        type:"order",
        notes:"Overage marked while order in-scanning"
      }

      sinon.stub(request.models.overage,'create', function (options) {
        console.log("+++",options);
        expect(options.merchantId).to.equal(1);
        expect(options.merchantTrackingId).to.equal('FLIP120');
        expect(options.facilityId).to.equal(1);
        expect(options.status).to.equal(status.overageStatus.created);
        expect(options.type).to.equal('order');
        return Promise.resolve(request.models.overage.build(payload));

      })

      orderService.markOrderOverage(request.models, payload, function (err,data) {
        console.log("+++",JSON.stringify(data,null,2));
        expect(data.merchantId).to.equal(1);
        expect(data.merchantName).to.equal('Flipkart');
        expect(data.merchantTrackingId).to.equal('FLIP120');
        expect(data.facilityId).to.equal(1);
        expect(data.status).to.equal(status.overageStatus.created);
        expect(data.type).to.equal('order');
        done();
      })

    })

  })

})