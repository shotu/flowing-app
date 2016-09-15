/**
 * Created by swapnil on 12/03/16.
 */

var chai = require('chai');
var rewire = require('rewire');
var sinonChai = require("sinon-chai");
var expect = chai.expect;
chai.use(sinonChai);

var orders = rewire('../../../../plugins/oms-apis/utils/orders');

describe("Order utility test cases", function () {
  describe("#calculateVolWeight", function () {
    it("should return valid volume for given LBH", function () {
      expect(orders.calculateVolWeight(100, 200, 50)).to.equal(200);
    });

    it("should return right vol weight for changed config value. ", function () {
      var config = {
        get: function (key) {
          expect(key).to.equal('utility:volWeightDivider');
          return 6000;
        }
      }

      orders.__set__('config', config);
      expect(orders.calculateVolWeight(100, 200, 50)).to.equal((100 * 200 * 50 / 6000));
    });
  })
});