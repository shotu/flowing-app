
'use strict';
const moment = require('moment');
module.exports = {
  getCurrentISTDateStringForSql: function(){
    let date = moment(Date.now()).utcOffset("+05:30");
    return date.format('YYYY-MM-DD HH:mm:ss');
  },

  getRoundOfISTDateStringForSql: function(days){
    let date = moment(Date.now()).utcOffset("+05:30");
    date.subtract(days,"days");
    date.hour(0);
    date.minute(0);
    date.second(0);
    return date.format('YYYY-MM-DD HH:mm:ss');
  }
}
