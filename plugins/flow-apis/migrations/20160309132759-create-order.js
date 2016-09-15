'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customerDetailId: {
        type: Sequelize.INTEGER
      },
      sourceDetailId: {
        type: Sequelize.INTEGER
      },
      value: {
        type: Sequelize.DOUBLE
      },
      collectableAmount: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue:0.0
      },
      merchantId: {
        type: Sequelize.INTEGER
      },
      merchantLocationId: {
        type: Sequelize.STRING
      },
      merchantTrackingId: {
        type: Sequelize.STRING
      },
      trackingId: {
        type: Sequelize.STRING
      },
      reason: {
        type: Sequelize.STRING
      },
      deliverBy: {
        type: Sequelize.DATE
      },
      pincode: {
        type: Sequelize.STRING
      },
      externalGeoLayerId: {
        type: Sequelize.STRING
      },
      absWeight: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue:0.0
      },
      volWeight: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue:0.0
      },
      type: {
        type: Sequelize.STRING
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue:true
      },
      version: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue:0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('orders');
  }
};