angular.module('asias')
  .service('emailService', function($http, $log){
    this.getEmails = function(callback){
      $http.get("http://localhost:8080/listEmails")
      .then(callback)
    }
  });
