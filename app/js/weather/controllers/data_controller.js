module.exports = function(app) {
  app.controller('MyController', ['$scope', 'leafletData',
    function($scope,leafletData) {
      var darkSkyKey = 'ddd77ff3c434ad2c1efc34ede4e8e016';

      var Plot = require('../../lib/plot');
      var plot = new Plot();

      var sampleData = require('../sampledata');
      // $scope.forecast = sampleData;

      var time = plot.mapTime(sampleData);
      var apparentTemperature = plot.mapApparentTemp(sampleData);
      var humidity = plot.mapField(sampleData, 'humidity');

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

      $scope.position = {};
      leafletData.getMap().then(function(map) {
        map.on('dblclick', function(e) {
          $scope.position.lat = e.latlng.lat;
          $scope.position.long = e.latlng.lng;
        });
      });

      angular.extend($scope, {
        seattle: {
          lat: 47.6,
          lng: -122.33,
          zoom: 9
        },

        defaults: {
          scrollWheelZoom: true,
          doubleClickZoom: false,
          tap: false,
          tileLayer: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          maxZoom: 14
        }
      });
    }]);
};
