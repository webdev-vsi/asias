angular.module('asias')
  .service('interpelationsService', function($http, $log){
    this.getInterpelations = function(callback){
      $http.get("http://localhost:8080/interpelations")
      .then(callback)
    };
    this.getInterpelation = function(interpelationId, callback){
      $http.get("http://localhost:8080/interpelations/"+interpelationId)
      .then(callback)
    }

  })
  .factory('Entry', function($resource) {
  return $resource('http://localhost:8080/interpelations/:id'); // Note the full endpoint address
});
