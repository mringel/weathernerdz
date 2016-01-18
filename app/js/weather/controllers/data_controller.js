module.exports = function(app) {
  app.controller('MyController', ['$scope', 'leafletData', '$http',
    function($scope,leafletData, $http) {

      $scope.inputDate = $scope.inputDate || new Date();
      $scope.position = $scope.position || {lat: 47.6, long: -122.33};
      $scope.weatherData = {};

      $scope.updateData = function() {
        getWeatherData();
      };

      // API key would normally live in an environment variable on the server
      var darkSkyKey = 'ddd77ff3c434ad2c1efc34ede4e8e016';

      var Plot = require('../../lib/plot');
      var plot = new Plot();

      // sample data so I don't have to ping the API for data every time
      // var sampleData = require('../sampledata');
      // plot.plotTemp(sampleData);
      // plot.plotHumidity(sampleData);

      var getWeatherData = function() {
    			var url = 'https://api.forecast.io/forecast/' + darkSkyKey + '/'
            + String($scope.position.lat) + ','
            + String($scope.position.long)
            + ','
            + String(Date.parse($scope.inputDate)/1000)
            + '?' + 'callback=JSON_CALLBACK';

          $http.jsonp(url)
            .success(function(data) {
              $scope.weatherData = data;
              plot.plotTemp(data);
              plot.plotHumidity(data);
            });
      };

      // on doubleclick on the map, get the lat/long, set a marker, and
      // call the dark sky api to get weather data for that date and time
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

      // defaults for map.  Loads on Seattle with a marker.
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
