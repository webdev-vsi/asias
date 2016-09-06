app.controller('ListEmailsCtrl',['$scope', 'emailService',  function($scope, emailService){
    emailService.getEmails(function(response){
        $scope.listEmails = response.data;
    })
  }])
  .controller('CountEmailsCtrl',['$scope', 'emailService', function($scope, emailService){
    emailService.getEmails(function(response){
        $scope.emailsCount = response.data.length;
    })
  }]);
