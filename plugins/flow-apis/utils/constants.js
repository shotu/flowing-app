/**
 * Created by ashish on 19/04/16.
 */

"use strict";


var orderCreationDefaults = {
  defaultStatus: {
    status: 'created',
    currentLocation: 'origin'
  },
  country: 'india'
};

var entityTypes = {
  order: 'order',
  bag: 'bag'
};

var xlsOrderStatus = {
  success: "success",
  inProgress : "inProgress",
  failed: "failed"
};

var merchantAttributes = {
  minAttemptCount: "minAttemptCount",
  confirmsRto: "confirmsRTO"
};

var orderFlags = {
  markForRTO: "markForRTO",
  retry: "retry"
};

var flagCreator = {
  system: "system",
  merchant: "merchant"
};

var flagUpdater = {
  system: "system",
  merchant: "merchant"
};

var rtoTypes = {
  cancelled: "cancelled",
  confirmationPending: "confirmation-pending",
  confirmed: "confirmed"
}

var duplicateMerchantTrackingIdError = "Duplicate Merchant Tracking Id";
var pincodeNotServiceableError = "Pincode is not Serviceable";
var defaultMinAttemptCount = 3;
var defaultConfirmsRTO = false;

module.exports = {
  orderCreation: orderCreationDefaults,
  entityTypes: entityTypes,
  xlsOrderStatus: xlsOrderStatus,
  duplicateMerchantTrackingIdError: duplicateMerchantTrackingIdError,
  pincodeNotServiceableError: pincodeNotServiceableError,
  orderFlags: orderFlags,
  merchantAttributes: merchantAttributes,
  flagCreator: flagCreator,
  flagUpdater: flagUpdater,
  defaultMinAttemptCount: defaultMinAttemptCount,
  defaultConfirmsRTO: defaultConfirmsRTO,
  rtoTypes: rtoTypes
}
