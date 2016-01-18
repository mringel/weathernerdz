var moment = require('moment');

module.exports = function() {

  var mapTime = function(forecastObj) {
    return forecastObj.hourly.data.map(function(obj) {
      return moment(obj.time*1000).format('Do h:mm a');
    });
  };

  var mapApparentTemp = function(forecastObj) {
    return forecastObj.hourly.data.map(function(obj) {
      return obj.apparentTemperature;
    });
  };

  var mapField = function(forecastObj, field) {
    return forecastObj.hourly.data.map(function(obj) {
        return obj[field];
    });
  };

  this.plotTemp = function(dataObj) {
    var time = mapTime(dataObj);
    var apparentTemperature = mapApparentTemp(dataObj);

    var tempPlotData = [
      {
        x: time,
        y: apparentTemperature,
        name: 'Apparent Temperature',
        type: 'scatter'
      }
    ];

    var tempLayout = {
      title: 'Apparent Temperature Hourly Forecast',
      xaxis: {
        title: 'Date'
      },
      yaxis: {
        title: 'Apparent Temperature'
      }
    };

    Plotly.newPlot('temp-plot', tempPlotData, tempLayout);

  }; //end plotTemp

  this.plotHumidity = function(dataObj) {
    var time = mapTime(dataObj);
    var humidity = mapField(dataObj, 'humidity');

    var humidityPlotData = [
      {
        x: time,
        y: humidity,
        name: 'Humidity',
        type: 'scatter'
      }
    ];

    var humidityLayout = {
      title: 'Humidity Hourly Forecast',
      xaxis: {
        title: 'Date'
      },
      yaxis: {
        title: 'Humidity'
      }
    };

    Plotly.newPlot('humidity-plot', humidityPlotData, humidityLayout);

  }; //end plotHumidity

}; // end constructor
