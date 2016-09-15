/**
 * Created by swapnil on 12/03/16.
 */

'use strict';

const order = require('../models/mysql/order');
const sequelize = require('sequelize');
const config = require('../../../config');
const Promise = require('bluebird');
const async = require('async');
const logger = require('../utils/logger-utils').logger;
var _ = require('lodash');
var constants = require('../utils/constants');

module.exports = {


  sayHello: function (models, orderPayload, sequelize, callback) {
    console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++");
    callback(null,"Success");
  }

}
