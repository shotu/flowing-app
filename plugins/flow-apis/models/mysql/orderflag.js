'use strict';
module.exports = function (sequelize, DataTypes) {
  var orderFlag = sequelize.define('orderFlag', {
    type: DataTypes.STRING,
    enabled: DataTypes.BOOLEAN,
    orderId: DataTypes.INTEGER,
    notes: DataTypes.STRING,
    creator: DataTypes.STRING,
    updater: DataTypes.STRING,
    accepted: DataTypes.BOOLEAN,
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    version: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    defaultScope: {
      where: {
        active: true
      }
    }
  }, {
    classMethods: {
      associate: function (models) {
        // associations can be defined here
        orderFlag.belongsTo(models.order);
      }
    }
  });
  return orderFlag;
};