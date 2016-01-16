module.exports = function(app) {
  app.controller('MyController', ['$scope', 'leafletData',
    function($scope,leafletData) {
      var darkSkyKey = 'ddd77ff3c434ad2c1efc34ede4e8e016';

      var sampleData = require('../sampledata');
      $scope.forecast = sampleData;

      var time = sampleData.hourly.data.map(function(obj) {
        return obj.time;
      });

      var apparentTemperature = sampleData.hourly.data.map(function(obj) {
        return obj.apparentTemperature;
      });

      var plotData = [
        {
          x: time,
          y: apparentTemperature,
          type: 'scatter'
        }
      ];

      Plotly.newPlot('plot', plotData);

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
