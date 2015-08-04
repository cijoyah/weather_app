var app = angular.module('weatherApp', []);

app.factory('weatherService',['$hhtp', '$q', function ($http, $q){
  function getWeatherInfo(location) {
    var deffered = $q.defer();
    $http.get('https://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20weather.forecast%20WHERE%20location%3D%22' + location + '%22&format=json&diagnostics=true&callback=')
    .success(function(data) {
      deffered.resolve(data.query.results.channel);
    })
    .error(function(err){
      console.log("Error getting weather info.")
      deffered.reject(err);
    });
    return deffered.promise;
  }

  return {
    getWeatherInfo: getWeatherInfo
  };
}]);

app.controller('weatherController', ['$scope', 'weatherService', function ('$scope', 'weatherService'){
  function weatherLocation(location) {
    weatherService.getWeatherInfo(location).then(function(data){
      $scope.place = data;
    });
  }
  weatherLocation('London');
  $scope.getWeather = function(location) {
    $scope.place = '';
    weatherLocation(location);
  };
}]);