'use strict';
module.exports = function (sequelize, DataTypes) {
  var orderItem = sequelize.define('orderItem', {
    orderId: {
      type: DataTypes.INTEGER,
      allowNUll: false
    },
    description: DataTypes.STRING,
    type: DataTypes.STRING,
    unitPrice: DataTypes.DOUBLE,
    quantity: DataTypes.INTEGER,
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
        orderItem.belongsTo(models.order);
      }
    }
  });
  return orderItem;
};