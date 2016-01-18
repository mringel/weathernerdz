require(__dirname + '/../../app/js/entry.js');
require('angular-mocks');
var testData = require(__dirname + '/../../app/js/weather/sampleData');

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
    
//
// more basic tests here
//
  });

  // describe('API request functions', function() {
  //   beforeEach(angular.mock.inject(function(_$httpBackend_, $rootScope) {
  //     $httpBackend = _$httpBackend_;
  //     $scope = $rootScope.$new();
  //     $ControllerConstructor('MyController', {$scope: $scope});
  //   }));
  //
  //   afterEach(function() {
  //     $httpBackend.verifyNoOutstandingExpectation();
  //     $httpBackend.verifyNoOutstandingRequest();
  //   });
  //
  //   it('should add data to weatherData with updateData', function() {
  //     $httpBackend.expectGET();
  //   });
  //
  // }); // end API request functions



});
