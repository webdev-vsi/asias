'use strict';

app.controller('InterpelationsCtrl', ['$scope', 'interpelationsService', function($scope, interpelationsService){
  interpelationsService.getInterpelations(function(response){
    $scope.interpelations = response.data;
    })
  }])
  .controller('InterpelationCtrl', ['$scope', '$routeParams', 'interpelationsService',  function($scope, $routeParams, interpelationsService){
    interpelationsService.getInterpelation($routeParams.id ,function(response){
      $scope.interpelation = response.data;
    }
  )
}])
  .controller('CreateInterpelationCtrl', ['$scope','$routeParams', 'interpelationsService', function($scope, $routeParams, interpelationsService){
    $scope.saveInterpelation  = function(){

      $scope.interpelation = {
        nr: $scope.interpelation.interpelationNr,
        date: $scope.interpelation.interpelationDate,
        country: $scope.interpelation.country,
        customsOffice: $scope.interpelation.customsOffice,
        subjectType:  $scope.interpelation.subjectType,
        authority:  $scope.interpelation.authority,
        description: $scope.interpelation.description,
        mailMessage: $scope.interpelation.mailMessage
      };
      alert(JSON.stringify($scope.interpelation, null, 2));
      console.log($scope.interpelation);
    }
}])
.controller('ResourceController',['$scope','Entry', function($scope, Entry) {
  var entry = Entry.get({ id: $scope.id }, function() {
    console.log(entry);
  }); // get() returns a single entry

  var entries = Entry.query(function() {
    console.log(entries);
  }); //query() returns all the entries

  $scope.entry = new Entry(); //You can instantiate resource class

  $scope.entry.data = 'some data';

  Entry.save($scope.entry, function() {
    //data saved. do something here.
  }); //saves an entry. Assuming $scope.entry is the Entry object
}]);
