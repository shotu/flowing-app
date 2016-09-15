'use strict';
module.exports = function (sequelize, DataTypes) {
  var orderAttribute = sequelize.define('orderAttribute', {
    key: DataTypes.STRING,
    value: DataTypes.STRING,
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
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
        orderAttribute.belongsTo(models.order);
      }
    }
  });
  return orderAttribute;
};