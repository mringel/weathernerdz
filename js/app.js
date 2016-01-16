angular.module('myApp', ['nemLogging', 'ui-leaflet'])
  .controller('MyController', function($scope) {

    angular.extend($scope, {
      seattle: {
        lat: 47.6,
        lng: -122.33,
        zoom: 12
      },

      defaults: {
        scrollWheelZoom: false,
        tap: false,
        tileLayer: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        maxZoom: 14
      }
    });
  });
