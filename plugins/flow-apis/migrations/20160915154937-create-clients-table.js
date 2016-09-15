'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.createTable('clients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      clientId: {
        type: Sequelize.INTEGER
      },
      firstName: {
          type: Sequelize.STRING
      },
      lastName :{
          type: Sequelize.STRING
      },
      pincode:{
        type: Sequelize.STRING
      },
      version:{
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue:0

      }
    });
},

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.dropTable('clients');
  }
};
