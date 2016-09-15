'use strict';
var _ = require('lodash');

var applicationStatuses = {
	created:  {
		dbStatus: "created",
		internalStatus: "applicationStatuses",
		externalStatus: "created, physical verification pending",
		merchantStatus: "",
		customerStatus: ""
	},
};

module.exports = {
	applicationStatuses: applicationStatuses
}
