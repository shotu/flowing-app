/**
 *
 */
'use strict';
var _ = require('lodash');
/**
 * @fileOverview
 * @name status.js
 *
 */


// var merchantStatuses ={
//
// 	shipmentDetailsReceived: "Shipment details received, physical verification pending",
// 	shipmentReceived:"Shipment received at Opinio warehouse",
// 	intransitToOpinioFacility:"In Transit to Opinio facility",
// 	outForDelivery:"Out for Delivery",
// 	successfullyDelivered:"Successfully Delivered",
// 	couldNotBeDelivered:"Could not be delivered",
// 	returnShipmentReceived:"Shipment received(return) at warehouse",
// 	rtoManifestGenerated:"RTO manifest generated",
// 	scheduledForRTO:"Scheduled for RTO",
// 	returnedToMerchant:"Returned to Merchant",
// 	orderCancelled:"Order Cancelled",
// 	orderWithOpinio:"Order With Opinio",
// 	intransitToMerchant:"In Transit to Merchant"
//
// }
var orderStatus = {
	created:  {
		dbStatus: "created",
		internalStatus: "Manifest Received",
		externalStatus: "Shipment details received, physical verification pending",
		merchantStatus: "shipmentDetailsReceived",
		customerStatus: "Order With Opinio"
	},
	pickedUpFromMerchant:{
		dbStatus: "pickedUpFromMerchant",
		internalStatus: "Forward Cluster Received",
		externalStatus: "Shipment details received, physical verification pending",
		merchantStatus: "shipmentDetailsReceived",
		customerStatus: "Order With Opinio"
	},
	receivedNotVerified:  {
		dbStatus: "receivedNotVerified",
		internalStatus: "Holding Area",
		externalStatus: "Shipment details received, physical verification pending",
		merchantStatus: "shipmentDetailsReceived",
		customerStatus: "Order With Opinio"
	},
	receivedVerified: {
		dbStatus: "receivedVerified",
		internalStatus: "Order in scanned",
		externalStatus: "Shipment received at Opinio warehouse",
		merchantStatus: "shipmentReceived",
		customerStatus: "Order With Opinio"
	},
	inTransitToCube: {
		dbStatus: "inTransitToCube",
		internalStatus: "In Transit to Cube",
		externalStatus: "In Transit to Cube",
		merchantStatus: "intransitToOpinioFacility",
		customerStatus: "Order With Opinio"
	},
	outForDelivery: {
		dbStatus: "outForDelivery",
		internalStatus: "Out for Delivery",
		externalStatus: "Out for Delivery",
		merchantStatus: "outForDelivery",
		customerStatus: "Order With Opinio"
	},
	delivered: {
		dbStatus: "delivered",
		internalStatus: "Successfully Delivered",
		externalStatus: "Successfully Delivered",
		merchantStatus: "successfullyDelivered",
		customerStatus: "Order With Opinio"
	},
	undeliveredAttempted: {
		dbStatus: "undeliveredAttempted",
		internalStatus: "Attempted (Not Delivered)",
		externalStatus: "Could not be delivered",
		merchantStatus: "couldNotBeDelivered",
		customerStatus: "Order With Opinio"
	},
	undeliveredUnAttempted: {
		dbStatus: "undeliveredUnAttempted",
		internalStatus: "Unattempted",
		externalStatus: "Could not be delivered",
		merchantStatus: "couldNotBeDelivered",
		customerStatus: "Order With Opinio"
	},
	atWarehouse: {
		dbStatus: "atWarehouse",
		internalStatus: "At Warehouse Return Order in Scan Pending",
		externalStatus: "Shipment received at warehouse,Will be attempted again",
		merchantStatus: "returnShipmentReceived",
		customerStatus: "Order With Opinio"
	},
	markedForRTO: {
		dbStatus: "markedForRTO",
		internalStatus: "To be RTO",
		externalStatus: "RTO manifest generated",
		merchantStatus: "rtoManifestGenerated",
		customerStatus: "Order With Opinio"
	},
	returned: {
		dbStatus: "returned",
		internalStatus: "Handed to Merchant",
		externalStatus: "Returned to Merchant",
		merchantStatus: "returnedToMerchant",
		customerStatus: "Order returned"
	},
	cancelled: {
		dbStatus: "cancelled",
		internalStatus: "Order created",
		externalStatus: "Order Cancelled",
		merchantStatus: "orderCancelled",
		customerStatus: "Order Cancelled"
	},
	lost: {
		dbStatus: "lost",
		internalStatus: "Order Lost",
		externalStatus: "Order With Opinio",
		merchantStatus: "orderWithOpinio",
		customerStatus: "Order With Opinio"
	},
	scheduledForRTO:{
		dbStatus: "scheduledForRTO",
		internalStatus: "Scheduled for RTO",
		externalStatus: "Scheduled for RTO",
		merchantStatus: "scheduledForRTO",
		customerStatus: "Order with Opinio"
	},
	intransitToMerchant:{
		dbStatus: "intransitToMerchant",
		internalStatus: "In Transit to Merchant",
		externalStatus: "In Transit to Merchant",
		merchantStatus: "intransitToMerchant",
		customerStatus: "Order with Opinio"
	}
};

orderStatus.smsAllowedStatuses = [orderStatus.outForDelivery.dbStatus,orderStatus.delivered.dbStatus,orderStatus.undeliveredAttempted.dbStatus,orderStatus.undeliveredUnAttempted.dbStatus];

let reportStatus = {
  all: 'all',
  underage: 'underage',
  verified: 'verified',
  inProgress: 'inProgress',
  attempted: 'attempted',
  successful: 'successful',
  delivered: 'delivered',
  unsuccessful: 'unsuccessful',
  rto: 'rto',
};

var overageStatus ={
	created: "created"
}


module.exports = {
	orderStatus: orderStatus,
  orderStatuses: _.map(orderStatus, function(status) { return status.dbStatus}),
  reportStatus: reportStatus,
	overageStatus:overageStatus
}



