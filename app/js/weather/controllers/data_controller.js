module.exports = function(app) {
  app.controller('MyController', ['$scope', 'leafletData', '$http',
    function($scope,leafletData, $http) {

      $scope.inputDate = $scope.inputDate || new Date();
      $scope.position = {};
      var darkSkyKey = 'ddd77ff3c434ad2c1efc34ede4e8e016';

      var Plot = require('../../lib/plot');
      var plot = new Plot();

      var sampleData = require('../sampledata');
      $scope.data = {};

      plot.plotTemp(sampleData);
      plot.plotHumidity(sampleData);

      var parseResponse = function(data) {
        console.log(data);
      };

      var getWeatherData = function() {
    			var url = 'https://api.forecast.io/forecast/' + darkSkyKey + '/'
            + String($scope.position.lat) + ','
            + String($scope.position.long)
            // + ','
            // + String($scope.inputDate)
            + '?' + 'callback=JSON_CALLBACK';

          $http.jsonp(url)
            .success(function(data) {
              console.log(data);
            });
    };

      leafletData.getMap().then(function(map) {
        map.on('dblclick', function(e) {
          $scope.position.lat = e.latlng.lat;
          $scope.position.long = e.latlng.lng;
          angular.extend($scope, {
            markers: {
              mainMarker: {
                lat: e.latlng.lat,
                lng: e.latlng.lng,
                message: 'Weather Data for this point'
              }
            }
          });
          getWeatherData();
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
        },
        markers: {
          mainMarker: {
            lat: 47.6,
            lng: -122.33,
            focus: true,
            message: 'Weather data at this point'
          }
        }
      });
    }]);
};
