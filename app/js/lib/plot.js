var moment = require('moment');

module.exports = function() {

  this.mapTime = function(forecastObj) {
    return forecastObj.hourly.data.map(function(obj) {
      return moment(obj.time*1000).format('Do h:mm a');
    });
  };

  this.mapApparentTemp = function(forecastObj) {
    return forecastObj.hourly.data.map(function(obj) {
      return obj.apparentTemperature;
    });
  };

  this.mapField = function(forecastObj, field) {
    return forecastObj.hourly.data.map(function(obj) {
        return obj[field];
    });
  };
};
