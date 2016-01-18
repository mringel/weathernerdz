require(__dirname + '/../../app/js/entry.js');
require('angular-mocks');
var testData = require(__dirname + '/../../app/js/weather/sampledata');

describe('weather nerdz controller', function() {
  var $httpBackend;
  var $ControllerConstructor;
  var $scope;

  beforeEach(angular.mock.module('WeatherNerdzApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $ControllerConstructor = $controller;
  }));

  it('should be able to create a controller', function() {
    var controller = $ControllerConstructor('MyController', {$scope: $scope});
    expect(typeof $scope).toBe('object');
    expect(typeof controller).toBe('object');
    expect(typeof $scope.position).toBe('object');
    expect($scope.position.lat).toBe(47.6);
    expect($scope.position.long).toBe(-122.33);

//
// more basic tests here
//
  });

  // This is a scaffolding for writing front-end unit tests assuming the app
  // calls our own backend.  I'm not familiar with writing front-end tests
  // for an app that doesn't have a back-end.


  describe('API request functions', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_, $rootScope) {
      $httpBackend = _$httpBackend_;
      $scope = $rootScope.$new();
      $ControllerConstructor('MyController', {$scope: $scope});
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should add data to weatherData with updateData', function() {
      $scope.inputDate = '1970-01-01T00:00:00.000Z';
      $httpBackend.expectJSONP('https://api.forecast.io/forecast/ddd77ff3c434ad2c1efc34ede4e8e016/47.6,-122.33,0?callback=JSON_CALLBACK')
        .respond(200, testData);
      $scope.updateData();
      $httpBackend.flush();
      expect($scope.weatherData.latitude).toBe(37.8267);
    });

  }); // end API request functions

// https://api.forecast.io/forecast/ddd77ff3c434ad2c1efc34ede4e8e016/47.6,-122.33,14531564280?callback=angular.callbacks._0

});
