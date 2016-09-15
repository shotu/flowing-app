'use strict';
module.exports = function (sequelize, DataTypes) {
  var customerDetail = sequelize.define('customerDetail', {
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      isEmail: true
    },
    addressId: DataTypes.STRING,
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    version: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    classMethods: {
      associate: function (models) {
        // associations can be defined here
      }
    }
  });
  return customerDetail;
};