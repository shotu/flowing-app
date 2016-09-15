'use strict';
module.exports = function (sequelize, DataTypes) {
  var order = sequelize.define('order', {
    customerDetailId: DataTypes.INTEGER,
    sourceDetailId: DataTypes.INTEGER,
    value: DataTypes.DOUBLE,
    collectableAmount: {
      type: DataTypes.DOUBLE,
      defaultValue: 0.0
    },
    merchantId: { type: DataTypes.INTEGER},  // to be taken from ERP
    merchantLocationId: DataTypes.INTEGER, // to be fetched from ERP service
    merchantTrackingId:{ type: DataTypes.STRING},
    trackingId: DataTypes.STRING,
    reason: DataTypes.STRING,
    deliverBy: DataTypes.DATE,
    pincode: DataTypes.STRING,
    externalGeoLayerId: DataTypes.STRING, // to be taken from ERP
    absWeight: DataTypes.DOUBLE,
    volWeight: DataTypes.DOUBLE,
    type: DataTypes.STRING,
    originMerchant: DataTypes.STRING,
    attemptedCount: {
      type: DataTypes.INTEGER,
      defaultValue:0
    },
    totalAttemptCount: {
      type: DataTypes.INTEGER,
      defaultValue: 3 // total attempt count by default will be 3, otherwise its merchant's attributes
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
        order.hasOne(models.orderStatus);
        order.belongsTo(models.customerDetail);
        order.belongsTo(models.sourceDetail);
        order.hasMany(models.orderAttribute);
        order.hasMany(models.orderItem);
        order.hasMany(models.orderFlag);
      }
    }
  });
  return order;
};