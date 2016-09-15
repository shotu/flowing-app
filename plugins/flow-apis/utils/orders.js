/**
 * Created by swapnil on 12/03/16.
 */

var config = require('../../../config');

var calculateVolWeight = function (length, breadth, height) {

  return (length * breadth * height) / config.get("utility:volWeightDivider");

};


module.exports.calculateVolWeight = calculateVolWeight;