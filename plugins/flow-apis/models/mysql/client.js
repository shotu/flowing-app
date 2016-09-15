'use strict';
module.exports = function (sequelize, DataTypes) {
  var client = sequelize.define('client', {
    clientId: DataTypes.INTEGER,
    firstName: DataTypes.STRING,
    lastName: DataTypes.DATE,
    pincode: DataTypes.STRING,
    version: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    classMethods: {
      associate: function (models) {

      }
    }
  });
  return client;
};
