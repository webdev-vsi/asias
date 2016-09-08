'use strict';

/* Controllers */

var app = angular.module('ngAsiasApp.controllers', []);


// Clear browser cache (in development mode)
//
// http://stackoverflow.com/questions/14718826/angularjs-disable-partial-caching-on-dev-machine
app.run(function($rootScope, $templateCache) {
    $rootScope.$on('$viewContentLoaded', function() {
        $templateCache.removeAll();
    });
});

app.controller('IntplListCtrl', ['$scope',
    'InterpelationsFactory',
    'InterpelationFactory',
    '$location',
    function(
        $scope,
        InterpelationsFactory,
        InterpelationFactory,
        $location
    ) {

        /* callback for ng-click 'editUser': */
        $scope.editIntpl = function(intplId) {
            $location.path('/intpl-detail/' + intplId);
        };

        /* callback for ng-click 'deleteUser':
        $scope.deleteUser = function (userId) {
          UserFactory.delete({ id: userId });
          $scope.users = UsersFactory.query();
        };
        */


        /* callback for ng-click 'createUser': */
        $scope.createNewUser = function() {
            $location.path('/intpl-creation');
        };

        //$scope.interpelations = InterpelationsFactory.query();

        InterpelationsFactory.query([], function(response) {

            $scope.interpelations = response;


            $scope.makeList = function makeList(interpelations) {

                var node = [];
                interpelations
                    .filter(function(c) {

                        if (c.parentId === 0) {
                            //console.log(c);
                            node.push(c);
                            //  console.log(node);
                        }

                    })
                return node;
            }
            $scope.interpelations = $scope.makeList($scope.interpelations);



            /*  TREE TRANSFORMATIONS BEGIN

            $scope.makeTree = function makeTree(interpelations, parent) {
                console.log($scope.interpelations)
                var node = {};
                interpelations
                .filter(function (c) {
                    return c.parrentId == parent;
                  })
                .forEach(function (c) {
                    node[c.id] = makeTree(interpelations, c.id);
                    return node[c]
                 });
                return node;
              };
              console.log($scope.makeTree($scope.interpelations));

              var nodes  = $scope.interpelations;

              function unflatten(arr) {
                var tree = [],
                    mappedArr = {},
                    arrElem,
                    mappedElem;

                // First map the nodes of the array to an object -> create a hash table.
                for(var i = 0, len = arr.length; i < len; i++) {
                  arrElem = arr[i];
                  mappedArr[arrElem.id] = arrElem;
                  mappedArr[arrElem.id]['children'] = [];
                }


                for (var id in mappedArr) {
                  if (mappedArr.hasOwnProperty(id)) {
                    mappedElem = mappedArr[id];
                    // If the element is not at the root level, add it to its parent array of children.
                    if (mappedElem.parrentId) {
                      mappedArr[mappedElem['parrentId']]['children'].push(mappedElem);
                    }
                    // If the element is at the root level, add it to first level elements array.
                    else {
                      tree.push(mappedElem);
                    }
                  }
                }
                return tree;
              }
              $scope.tree = unflatten(nodes);
              console.log(JSON.stringify($scope.tree, null, null, 2));


            END OF TREE TRANSFORMATIONS
            */



        })

        //console.log($scope.array);



    }
]);

app.controller('IntplDetailCtrl', ['$scope', '$rootScope', '$routeParams', 'InterpelationFactory', 'InterpelationTreeFactory', 'InterpelationCreateFactory', '$location',
    function($scope, $rootScope, $routeParams, InterpelationFactory, InterpelationTreeFactory, InterpelationCreateFactory, $location) {

        /* callback for ng-click 'updateUser': */
        $scope.updateIntpl = function() {
            InterpelationFactory.update($scope.intpl);
            $location.path('/user-list');
        };

        /* callback for ng-click 'cancel': */
        $scope.cancel = function() {
            $location.path('/user-list');
        };
        $scope.tree = InterpelationTreeFactory.query({
            id: $routeParams.id
        });
        //  $scope.intpl = InterpelationFactory.show({id: $routeParams.id});
        $scope.templateTree = 'app/templates/treeCategory.html';

        $scope.removeItem = function(item) {

            //var index = $scope.tree.indexOf(item);
            //$scope.tree.splice(15,1);
            //console.log(JSON.stringify($scope.tree));
            console.log(item);
        }

        $scope.addNode = function(data) {
            if (data.children === null) {
                data.children = [];
            }
            data.children.push({
                id: 1,
                parentId: data.id,
                children: []
            });
            $scope.newResponse = {
                parentId: data.id
            };
            InterpelationCreateFactory.create($scope.newResponse);
        };


        $scope.saveInterpelation = function(data) {
            console.log(data);

            // actions performed after validation
            if (true) {

                console.log("data saved");
                return this.editMode = !this.editMode;
            } else {
                console.log("something went wrong!");
            }
        };



    }
]);
app.controller('IntplCreateCtrl', ['$scope',
    '$rootScope',
    '$timeout',
    'InterpelationCreateFactory',
    'CountryFactory',
    '$location',
    'CustomsOfficesFactory',
    'InterpelationSubjectFactory',
    'InterpelationTypeFactory',
    'InterpelationPriorityFactory',
    'AuthoritiesFactory',
    function($scope,
        $rootScope,
        $timeout,
        InterpelationCreateFactory,
        CountryFactory,
        $location,
        CustomsOfficesFactory,
        InterpelationSubjectFactory,
        InterpelationTypeFactory,
        InterpelationPriorityFactory,
        AuthoritiesFactory) {


        // Implementation of country Service
        // GET METHOD
        $scope.countries = CountryFactory.query();
        console.log($scope.countries);
        $scope.selectedCountry = $scope.countries[0];
        //$scope.intpl.country = 2;
        //$scope.inptl.country = $scope.selectedCountry;

        //Implementation of Customs Office Factory
        $scope.customsOffices = CustomsOfficesFactory.query();
        $scope.selectedCustomsOffice = $scope.customsOffices[0];

        //Implementation of authorities list
        $scope.authorities = AuthoritiesFactory.query();
        $scope.selectedAuthoritie = $scope.authorities[0];

        //Implementation of subjectTypes
        $scope.subjectTypes = InterpelationSubjectFactory.query();
        //$scope.selectedSubjectType = $scope.subjectTypes[0];

        //Implementation of interpelation type
        $scope.interpelationType = InterpelationTypeFactory.query();
        $scope.selectedInterpelationType = $scope.interpelationType[0];

        //Implementation of interpelation priority
        $scope.interpelationPriority = InterpelationPriorityFactory.query();
        $scope.selectedInterpelationPriority = $scope.interpelationPriority[0];

        /* create subject inside create-interpelation conroller */
        $scope.addSubject = function() {
            var newSubject = {
                "subjectName": $scope.subjectType
            };
            InterpelationSubjectFactory.create(newSubject);
            /* Calling query method to update subjectType list */

            console.log($scope.subjectTypes);
            //$scope.selectedSubjectType =  $scope.subjectType;
            $scope.hideSubjectForm = true;
            $scope.subjectType = '';
            /*console.log(newSubject);*/

            //workaround hz cum de facut citirea imediat dupa inscriere in BD.
            $timeout(function() {
                InterpelationSubjectFactory.query(function(response) {
                    $scope.subjectTypes = response;
                })
            }, 500);
        }

        $scope.refresh = function() {
                InterpelationSubjectFactory.query(function(response) {
                    $scope.subjectTypes = response;
                });
            }
            /* callback for ng-click 'createNewInterpelation': */
        $scope.createNewIntpl = function() {
            // console.log($scope.intpl);


            // Prepare Object To Be Created

            // Creating Country Object to send to Server
            $scope.intpl.country = {
                "cod": $scope.selectedCountry
            };

            //AuthoritiesFactory
            $scope.intpl.authority = {
                "id": $scope.selectedAuthoritie
            };

            //Subject
            $scope.intpl.subjectType = {
                "id": $scope.selectedSubjectType
            };

            $scope.intpl.interpelationPriority = $scope.selectedInterpelationPriority;


            //Convert To Timestamp
            $scope.intpl.interpelationDate = new Date($scope.intpl.interpelationDate.split("-").reverse().join("-")).getTime();
            //console.log($scope.intpl.interpelationDate);
            //console.log($scope.intpl.country);

            // Interpelation Creation from Factory
            InterpelationCreateFactory.create($scope.intpl);
            console.log($scope.intpl);

            //Setting Interpelation Window show to false
            $rootScope.createIntpl = false;

            //Clearing  all values for next interpelation
            $scope.intpl = '';
            $location.path('/intpl-list');
        }
    }
]);
app.controller('CountriesCtrl', ['$scope',
    '$location',
    'CountryFactory',
    function($scope, $location, CountryFactory) {
        $scope.countryList = CountryFactory.query();
    }
]);
app.controller('CustomsOfficesCtrl', ['$scope',
    '$location',
    'CustomsOfficesFactory',
    function($scope, $location, CustomsOfficesFactory) {
        $scope.customsOfficesList = CustomsOfficesFactory.query();
    }
]);

app.controller('EmailCountCtrl', function($scope, $http) {
    $scope.emailsCount = "-";
    $http.get("http://localhost:8080/mail-count")
        .then(function(response) {
            $scope.emailsCount = response.data;
            //console.log($scope.myWelcome);
        });
});
app.controller('EmailListCtrl', ['$scope', '$http', 'EmailListFactory', '$location', 'EmailImportFactory',
    function($scope, $http, EmailListFactory, $location, EmailImportFactory) {
        $scope.listEmails = EmailListFactory.query();

        $scope.importEmail = function(emailId) {
            $location.path('/email-import/' + emailId);
        };

        $scope.markAsProcessed = function() {
            console.log("clicked");
            //var msg  = [{"id": 0,"messageId": "<1160528470.5695001.1366467013990.JavaMail.ibis@1UTYUX-000Fuk-ZR.mta.twitter.com>"}];
            var successCallback = function() {
                console.log("ok");
            }
            var errorCallback = function() {
                console.log("error");
            }

            //  $http.post("http://localhost:8080/editEmail", msg).then(successCallback, errorCallback);
            //  console.log($scope.listEmails);
            //  console.log($scope.listEmails);
            angular.forEach($scope.listEmails, function(value, key) {

                //  console.log(msg);
                //  EmailImportFactory.create(msg);
                //  this.push(key + ':' + value);
                //  EmailImportFactory.create({id: value.messageId});
                $http.post("http://localhost:8080/editEmail/" + value.messageId).then(successCallback, errorCallback);
                //    console.log($scope.msg);
                console.log("proccesed item " + key + ":" + value.messageId);
            });
        };
    }
]);
app.controller('EmailImportCtrl', ['$scope',
    '$rootScope',
    '$routeParams',
    'EmailImportFactory',
    '$timeout',
    'InterpelationCreateFactory',
    'CountryFactory',
    '$location',
    'CustomsOfficesFactory',
    'InterpelationSubjectFactory',
    'InterpelationTypeFactory',
    'InterpelationPriorityFactory',
    'AuthoritiesFactory',
    '$filter',

    function($scope,
        $rootScope,
        $routeParams,
        EmailImportFactory,
        $timeout,
        InterpelationCreateFactory,
        CountryFactory,
        $location,
        CustomsOfficesFactory,
        InterpelationSubjectFactory,
        InterpelationTypeFactory,
        InterpelationPriorityFactory,
        AuthoritiesFactory,
        $filter) {


        $scope.countries = CountryFactory.query();
        console.log($scope.countries);
        $scope.selectedCountry = $scope.countries[0];
        //$scope.intpl.country = 2;
        //$scope.inptl.country = $scope.selectedCountry;

        //Implementation of Customs Office Factory
        $scope.customsOffices = CustomsOfficesFactory.query();
        $scope.selectedCustomsOffice = $scope.customsOffices[0];

        //Implementation of authorities list
        $scope.authorities = AuthoritiesFactory.query();
        $scope.selectedAuthoritie = $scope.authorities[0];

        //Implementation of subjectTypes
        $scope.subjectTypes = InterpelationSubjectFactory.query();
        //$scope.selectedSubjectType = $scope.subjectTypes[0];

        //Implementation of interpelation type
        $scope.interpelationType = InterpelationTypeFactory.query();
        $scope.selectedInterpelationType = $scope.interpelationType[0];

        //Implementation of interpelation priority
        $scope.interpelationPriority = InterpelationPriorityFactory.query();
        $scope.selectedInterpelationPriority = $scope.interpelationPriority[0];

        $scope.messageToImport = EmailImportFactory.query({
            id: $routeParams.id
        });
        //console.log(id: $routeParams.id);
        $scope.getDate = function(message) {
            var sentDateTimestamp = message.sentDate;
            message.sentDate = $filter('date')(message.sentDate, 'dd-MM-yyyy');
            $scope.intpl.interpelationDateApplicant = message.sentDate;
            console.log($scope.intpl.interpelationDateApplicant);

            console.log(message.content);
            $scope.intpl.description = message.content;
            //  intplImport.interpelationNr = date;

            //console.log(message.sentDate.setMonth());
            var datePlusMonth = sentDateTimestamp + 2592000000;
            console.log(datePlusMonth);
            console.log(sentDateTimestamp);

            $scope.intpl.executionDeadline = $filter('date')(datePlusMonth, 'dd-MM-yyyy');
            console.log($scope.intpl.executionDeadline);
        }

        $scope.createNewIntpl = function() {
            console.log($scope.intpl);
            var intplObject = {
                "parentId": 0,
                "interpelationNr": $scope.intpl.interpelationNr,
                "interpelationType": $scope.intpl.inter,
                "interpelationPriority": $scope.intpl.selectedInterpelationPriority,
                "interpelationDate": $scope.intpl.interpelationDateInitialACSV,
                "executionDate": null,
                "country": $scope.intpl.selectedCountry,
                "customsOffice": null,
                "subjectType": null,
                "subjectTypeOptional": null,
                "authority": $scope.intpl.selectedAuthoritie,
                "applicantInterpelationDate": null,
                "description": null,
            };
        };

    }
]);
app.directive('createInterpelation', function() {
    return {
        restrict: 'E',
        templateUrl: 'app/templates/create-interpelation.html'
    };
});
