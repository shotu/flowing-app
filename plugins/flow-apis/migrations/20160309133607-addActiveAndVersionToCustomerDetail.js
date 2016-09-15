'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        queryInterface.addColumn(
            'customerDetails',
            'version',
            {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            }
        );

        queryInterface.addColumn(
            'customerDetails',
            'active',
            {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true
            }
        );
    },

    down: function (queryInterface, Sequelize) {
        queryInterface.removeColumn('customerDetails', 'active');
        queryInterface.removeColumn('customerDetails', 'version');
    }
};
