

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

describe("client controller", function () {

  beforeEach(function () {
    orderController = rewire("../../../../plugins/flow-apis/services/clients");
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

  describe('clientMethodTestCases', function () {

  })

})
