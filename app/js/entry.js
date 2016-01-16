require('angular/angular');
require('leaflet');
require('angular-simple-logger');
require('ui-leaflet');
var angular = window.angular;

var weatherNerdzApp = angular.module('WeatherNerdzApp', ['nemLogging', 'ui-leaflet']);
require('./weather/weather')(weatherNerdzApp);
