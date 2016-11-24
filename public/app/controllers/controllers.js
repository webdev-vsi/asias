'use strict';

/* Controllers */

var app = angular.module('ngAsiasApp.controllers', ['ui-notification']);


// Clear browser cache (in development mode)
//
// http://stackoverflow.com/questions/14718826/angularjs-disable-partial-caching-on-dev-machine
app.run(function($rootScope, $templateCache) {
    $rootScope.$on('$viewContentLoaded', function() {
        $templateCache.removeAll();
    });
});
app.controller('ReportsCtrl', ['$scope',
    'InterpelationsFactory',
    function($scope, InterpelationsFactory) {

        InterpelationsFactory.query(
            function(data) {
                $scope.table = data;
                console.log(data);
            },
            function(error) {
                alert(error);
            });

        $scope.exportData = function() {
            var blob = new Blob([document.getElementById('exportable').innerHTML], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
            });
            saveAs(blob, "Report.xls");
        };


    }
]);
app.controller('IntplListCtrl', ['$scope',
    'InterpelationsFactory',
    'InterpelationFactory',
    'InterpelationPaginator',
    '$location',
    '$rootScope',
    function(
        $scope,
        InterpelationsFactory,
        InterpelationFactory,
        InterpelationPaginator,
        $location,
        $rootScope
    ) {

        $scope.pageSize = 15;
        $scope.currentPage = 0;
        $scope.displayPagesLength = 10;


        function getDirection() {
            var getDirection = $location.search();
            var direction;
            if (getDirection.type === "entries") {
                direction = "INTRARE";
            } else if (getDirection.type === "output") {
                direction = "IESIRE";
            } else {
                direction = 'TOATE';
            }
            return direction;
        }


        var renderPagedTree = function() {
            InterpelationPaginator.query({
                page: $scope.currentPage,
                size: $scope.pageSize,
                direction: getDirection()
            }, function(response) {
                //console.log(InOut.type);
                $scope.interpelations = response.result;
                $scope.pageCount = response.pageCount - 1;
                $scope.rowCount = response.rowCount;
                //$rootScope.intrari = $scope.rowCount;
                $scope.PaginatorElements = displayPages($scope.displayPagesLength, $scope.pageCount, $scope.currentPage);
            });
        };


        renderPagedTree();

        var displayPages = function(displayPagesLength, pageCount, currentPage) {
            var displayPagesArr = [];

            if (pageCount <= displayPagesLength) {
                displayPagesLength = pageCount;
            }
            for (var i = 0; i <= displayPagesLength; i++) {
                displayPagesArr[i] = currentPage + i;
                if (displayPagesArr[i] === pageCount) {
                    //console.log(displayPagesArr[i]);
                    //console.log(displayPagesArr);
                    return displayPagesArr;
                }
            }
            //console.log(displayPagesArr);
            return displayPagesArr;
        };


        $scope.firstPage = function() {
            if ($scope.currentPage === 0) {
                return;
            }
            $scope.currentPage = 0;
            renderPagedTree();
            $scope.PaginatorElements = displayPages($scope.displayPagesLength, $scope.pageCount, $scope.currentPage);
        };

        $scope.lastPage = function() {
            $scope.currentPage = $scope.pageCount;
            renderPagedTree();
            //workaround for dispaing last array
            var localCurrentPage = $scope.currentPage - $scope.displayPagesLength + 1;
            $scope.PaginatorElements = displayPages($scope.displayPagesLength, $scope.pageCount, localCurrentPage);
        };

        $scope.thisPage = function(page) {
            //console.log(page);
            //console.log($scope.currentPage);
            $scope.currentPage = page;
            renderPagedTree();
            //console.log($scope.currentPage);
            //renderPagedTree();
        };

        $scope.morePages = function() {
            var arrLength = $scope.PaginatorElements.length;
            $scope.LastElem = $scope.PaginatorElements[arrLength - 1];

            if ($scope.LastElem > $scope.pageCount) {
                return;
            }
            $scope.currentPage = $scope.LastElem;
            $scope.PaginatorElements = displayPages($scope.displayPagesLength, $scope.pageCount, $scope.LastElem);
            renderPagedTree();
            //  console.log($scope.PagesNumber);
        };

        $scope.nextPage = function() {

            if ($scope.currentPage === $scope.pageCount) {
                return;
            }
            //console.log($scope.pageCount, $scope.currentPage);
            $scope.currentPage += 1;
            renderPagedTree();

            $scope.PaginatorElements = displayPages($scope.displayPagesLength, $scope.pageCount, $scope.currentPage);
        };

        $scope.prevPage = function() {
            if ($scope.currentPage === 0) {
                return;
            }
            $scope.currentPage -= 1;
            renderPagedTree();
            $scope.PaginatorElements = displayPages($scope.displayPagesLength, $scope.pageCount, $scope.currentPage);

        };

        /////////////////
        /* ORIGINAL
        InterpelationsFactory.query([], function(response) {

            var InOut = $location.search();
            //console.log(InOut.type);
            $scope.interpelations = response;


            $scope.makeList = function makeList(interpelations, inOut) {
                var node = [];
                var type;
                //console.log(type);
                if (inOut.type === "entries") {
                    //    console.log(inOut.type);
                    type = "INTRARE";
                } else if (inOut.type === "output") {
                    type = "IESIRE";
                    //    console.log(inOut.type);
                }
                interpelations
                    .filter(function(c) {
                        if (c.parentId === 0 && c.interpelationType === type) {
                            //console.log(c);
                            node.push(c);
                            //  console.log(node);
                        } else if (c.parentId === 0 && type === undefined) {
                            node.push(c);
                        }
                    });
                type = '';
                return node;
            };

            $scope.interpelations = $scope.makeList($scope.interpelations, InOut);
        });
        */

        /* callback for ng-click 'editUser': */
        $scope.editIntpl = function(intplId) {
            $location.path('/intpl-detail/' + intplId);
        };


        /* callback for ng-click 'createUser': */
        $scope.createNewUser = function() {
            $location.path('/intpl-creation');
        };

        //$scope.interpelations = InterpelationsFactory.query();


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
        END OF TREE TRANSFORMATIONS */

    }
]);
app.controller('IntplDetailCtrl', ['$http',
    '$scope',
    '$rootScope',
    '$routeParams',
    'InterpelationFactory',
    'InterpelationTreeFactory',
    'InterpelationCreateFactory',
    'CountryFactory',
    'InterpelationSubjectFactory',
    'AuthoritiesFactory',
    '$location',
    'Notification',
    'moment',
    'InterpelationTypeFactory',
    'InterpelationPriorityFactory',
    function($http,
        $scope,
        $rootScope,
        $routeParams,
        InterpelationFactory,
        InterpelationTreeFactory,
        InterpelationCreateFactory,
        CountryFactory,
        InterpelationSubjectFactory,
        AuthoritiesFactory,
        $location,
        Notification,
        moment,
        InterpelationTypeFactory,
        InterpelationPriorityFactory) {

        console.log($scope.exampleDate);
        //root element id
        $scope.rootId = $routeParams.id;

        $scope.countries = CountryFactory.query();
        $scope.selectedCountry = $scope.countries[0];


        $scope.subjectTypes = InterpelationSubjectFactory.query();
        $scope.selectedSubjectType = $scope.subjectTypes[0];

        $scope.authorities = AuthoritiesFactory.query();
        $scope.selectedAuthoritie = $scope.authorities[0];

        //Implementation of interpelation type
        $scope.interpelationType = InterpelationTypeFactory.query();
        $scope.selectedInterpelationType = $scope.interpelationType[0];

        //Implementation of interpelation priority
        $scope.interpelationPriority = InterpelationPriorityFactory.query();
        $scope.selectedInterpelationPriority = $scope.interpelationPriority[0];


        /* callback for ng-click 'updateUser': */
        $scope.updateIntpl = function() {
            InterpelationFactory.update($scope.intpl);
            $location.path('/user-list');
        };

        /* callback for ng-click 'cancel': */
        $scope.cancel = function() {
            $location.path('/');
        };


        $scope.tree = InterpelationTreeFactory.query({
                id: $routeParams.id
            },
            function(data) {

                console.log(data);

                console.log("Succces query");
            },
            function() {
                console.log("error query");
            }
        );

        //reformat interpelationDate from timeStamp to dd-MM-yyyy

        //  $scope.intpl = InterpelationFactory.show({id: $routeParams.id});
        $scope.templateTree = 'app/templates/treeCategory.html';

        //variable for editMode
        var dateTransform;
        $scope.editNode = function(item) {
            console.log(item.editMode, item.showBody);

            //hack for displaying correct date format in datePicker and convert to timestamp
            if (!dateTransform) {
                dateTransform = true;
                //console.log("edit- " + item.interpelationDate);
                //To dateFormat (DD-MM-YYYY)
                item.interpelationDate = moment(item.interpelationDate).format("DD-MM-YYYY");
                item.applicantInterpelationDate = moment(item.applicantInterpelationDate).format("DD-MM-YYYY");
                item.executionDate = moment(item.executionDate).format("DD-MM-YYYY");
                item.dateControl = moment(item.dateControl).format("DD-MM-YYYY");

                //console.log("edit- " + item.interpelationDate);
            } else {
                dateTransform = false;
                //console.log(item.interpelationDate);
                //To Timestamp
                item.interpelationDate = moment(item.interpelationDate, "DD-MM-YYYY").valueOf();
                item.applicantInterpelationDate = moment(item.applicantInterpelationDate, "DD-MM-YYYY").valueOf();
                item.executionDate = moment(item.executionDate, "DD-MM-YYYY").valueOf();
                item.dateControl = moment(item.dateControl, "DD-MM-YYYY").valueOf();
                //console.log(item.interpelationDate);
            }
        };

        var canDelete = function(item) {
            if (item.children === null) {
                return true;
            }
            return false;
        };
        $scope.removeItem = function(item) {
            //console.log(item.children.length);
            var itemToRemove = {
                id: item.id,
            };
            //using canDelete method
            if (canDelete(item)) {
                // using http method because $resource method doesnt work with DELETE
                $http({
                    url: 'http://localhost:8080/interpelation',
                    method: 'DELETE',
                    data: itemToRemove,
                    headers: {
                        "Content-Type": "application/json;charset=utf-8"
                    }
                }).then(function(res) {
                    Notification.success("Interpelarea a fost stearsa!");
                    $scope.tree = InterpelationTreeFactory.query({
                        id: $routeParams.id
                    });
                }, function(error) {
                    Notification.error(error);
                });
            } else {
                Notification.error("Nu se permite stergerea interpelarii initiale");
            }
        };
        $scope.addNode = function(data) {
            // TODO when create new child set editMode to true;
            if (data.children === null) {
                data.children = [];
            }
            data.children.push({
                //  id: 1,
                parentId: data.id,
                children: [],
                editMode: true,
                showBody: true
            });
            $scope.newResponse = {
                parentId: data.id

            };
            console.log(data);
            //InterpelationCreateFactory.create($scope.newResponse);
        };

        //this.editMode = true;

        //Notification.success("adaugata");


        $scope.saveInterpelation = function(data) {
            //  var timeStampDate = moment(data.interpelationDate, "dd-MM-yyyy").valueOf();
            //$scope.interpelationDate = moment(data.interpelationDate).format("DD-MM-YYYY");
            data.isClosed = 0;
            data.interpelationDate = moment(data.interpelationDate, "DD-MM-YYYY").valueOf();
            data.applicantInterpelationDate = moment(data.applicantInterpelationDate, "DD-MM-YYYY").valueOf();
            data.executionDate = moment(data.executionDate, "DD-MM-YYYY").valueOf();
            data.dateControl = moment(data.dateControl, "DD-MM-YYYY").valueOf();
            data.country = {
                countryCod2: data.selectedCountry
            };
            data.authority = {
                "id": data.selectedAuthoritie
            };

            $scope.newResponse = {
                id: data.id,
                parentId: data.parentId,
                interpelationNr: data.interpelationNr,
                interpelationType: data.interpelationType,
                interpelationPriority: "RIDICATA",
                interpelationDate: moment(data.interpelationDate, "DD-MM-YYYY").valueOf(),
                executionDate: null,
                country: {
                    "countryCod2": data.selectedCountry
                },
                customsOffice: null,
                subjectType: {
                    "id": data.selectedSubjectType
                },
                subjectTypeOptional: null,
                authority: {
                    "id": data.selectedAuthoritie
                },
                applicantInterpelationDate: null,
                description: data.description,
                mailMessage: null

            };
            console.log($scope.newResponse)
            console.log(data);
            //console.log($scope.newResponse.interpelationDate);

            InterpelationCreateFactory.create(data,
                function(data) {
                    InterpelationTreeFactory.query({
                            id: $routeParams.id
                        },
                        function(data) {
                            $scope.tree = data;
                            //console.log(data);
                            //console.log("Succces query");
                            Notification.success("A fost adaugata interpelarea " + $scope.newResponse.interpelationNr);
                            //resetam newResponse
                            $scope.newResponse = {};

                        },
                        function() {
                            console.log("error query");
                        }
                    );
                },
                function(error) {
                    console.log("errror");
                }
            );

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
    'Notification',
    '$route',
    'moment',
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
        AuthoritiesFactory,
        Notification,
        $route,
        moment
    ) {


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
                });
            }, 500);
        };

        //add authority inside create-interpelation
        $scope.addAuthority = function(authority) {
            var newAuthority = {
                "authorityType": $scope.authorityType,
                "authorityName": $scope.authorityName,
                "country": {
                    "cod": $scope.selectedCountry
                }
            };
            //console.log(newAuthority);
            AuthoritiesFactory.create(newAuthority);
            $scope.hideAuthorityForm = true;
            $scope.authorityName = '';

            $timeout(function() {
                AuthoritiesFactory.query(function(response) {
                    $scope.authorities = response;
                });
            }, 500);
        };



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
                "countryCod2": $scope.intpl.selectedCountry
            };

            //AuthoritiesFactory
            $scope.intpl.authority = {
                "id": $scope.intpl.selectedAuthoritie
            };

            //Subject
            $scope.intpl.subjectType = {
                "id": $scope.intpl.selectedSubjectType
            };
            $scope.intpl.interpelationPriority = $scope.intpl.selectedInterpelationPriority;

            //Convert To Timestamp
            $scope.intpl.interpelationDate = moment($scope.intpl.interpelationDate, "DD-MM-YYYY").valueOf();
            $scope.intpl.applicantInterpelationDate = moment($scope.intpl.applicantInterpelationDate, "DD-MM-YYYY").valueOf();
            $scope.intpl.executionDate = moment($scope.intpl.executionDate, "DD-MM-YYYY").valueOf();


            // Interpelation Creation from Factory
            console.log($scope.intpl);

            InterpelationCreateFactory.create($scope.intpl,
                function(success) {
                    Notification.success("Interpelarea Nr: " + $scope.intpl.interpelationNr + " a fost adaugata");
                    console.log($scope.intpl);

                    //Setting Interpelation Window show to false
                    $rootScope.createIntpl = false;

                    //Clearing  all values for next interpelation
                    $scope.intpl = '';

                    $route.reload();
                },
                function(error) {
                    Notification.error("Interpelarea Nr: " + $scope.intpl.interpelationNr + " nu a fost adaugata");
                    return;
                }
            );
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
    'Notification',
    'moment',
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
        $filter,
        Notification,
        moment) {

        $scope.emailImport = true;

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
            /*
            @message params
              content
              from
              messageId
              replyTo
              sentDate
              subject
              to
            */

            function search(nameKey, prop, myArray) {
                for (var i = 0; i < myArray.length; i++) {
                    if (myArray[i][prop] === nameKey) {
                        return myArray[i];
                    }
                }
                return false;
            }

            var result = search(message.subject, 'subjectName', $scope.subjectTypes);

            //Begin Data asign from email
            if (result) {
                $scope.intpl.selectedSubjectType = result.id;
            }
            //Date transformation
            $scope.intpl.interpelationDate = moment(message.sentDate).format("DD-MM-YYYY");
            $scope.intpl.applicantInterpelationDate = moment(message.sentDate).format("DD-MM-YYYY");

            //Other fields
            $scope.intpl.description = message.content;
            //End Data asign from email


            //Debug information
            /*
            console.log(result);
            console.log(message)
            console.log($scope.subjectTypes);
            */


            /*
              var sentDateTimestamp = message.sentDate;
              message.sentDate = $filter('date')(message.sentDate, 'dd-MM-yyyy');
              $scope.intpl.interpelationDate = message.sentDate;
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
              */

        };

        $scope.createNewIntpl = function() {

            var id = $routeParams.id;


            $scope.intpl.country = {
                "countryCod2": $scope.intpl.selectedCountry
            };

            //AuthoritiesFactory
            $scope.intpl.authority = {
                "id": $scope.intpl.selectedAuthoritie
            };

            //Subject
            $scope.intpl.subjectType = {
                "id": $scope.intpl.selectedSubjectType
            };
            $scope.intpl.interpelationPriority = $scope.intpl.selectedInterpelationPriority;
            //console.log(intplObject);
            //var intplObjectPretty = angular.toJson(intplObject);
            //console.log(intplObjectPretty);
            $scope.intpl.interpelationDate = moment($scope.intpl.interpelationDate, "DD-MM-YYYY").valueOf();
            $scope.intpl.applicantInterpelationDate = moment($scope.intpl.applicantInterpelationDate, "DD-MM-YYYY").valueOf();
            $scope.intpl.executionDate = moment($scope.intpl.executionDate, "DD-MM-YYYY").valueOf();
            //console.log($scope.intpl);
            //console.log(id);
            EmailImportFactory.create({
                    id: id
                },
                $scope.intpl,

                function(success) {
                    Notification.success("Mesajul a fost importat");
                    $location.path('#/');
                },
                function(error) {
                    Notification.error("A aparut o eroare la import: " + error);
                });
        };

    }
]);
app.controller('CountriesCtrl', ['$scope',
    '$location',
    'CountryFactory',
    function($scope, $location, CountryFactory) {
        $scope.countryList = CountryFactory.query();
    }
]);
app.controller('SubjectsCtrl', ['$scope',
    '$location',
    'InterpelationSubjectFactory',
    'Notification',
    function($scope, $location, InterpelationSubjectFactory, Notification) {
        $scope.subjectsList = InterpelationSubjectFactory.query();
        $scope.saveSubject = function(data) {
            if (data === null || data === undefined) {
                Notification.error("Subiectul trebuie completat");
                return;
            }

            InterpelationSubjectFactory.create(data,
                function() {
                    $scope.subjectsList = InterpelationSubjectFactory.query();
                    Notification.success("Subiect adaugat cu succes!");
                    $scope.editMode = false;
                    $scope.new.subjectName = '';
                },
                function(error) {

                }
            );
        };
    }
]);
app.controller('CustomsOfficesCtrl', ['$scope',
    '$location',
    'CustomsOfficesFactory',
    function($scope, $location, CustomsOfficesFactory) {
        $scope.customsOfficesList = CustomsOfficesFactory.query();
    }
]);
app.controller('AuthoritiesCtrl', ['$scope',
    '$location',
    'AuthoritiesFactory',
    'Notification',
    'CountryFactory',
    function($scope, $location, AuthoritiesFactory, Notification, CountryFactory) {
        //Authorities factory
        $scope.authoritiesList = AuthoritiesFactory.query();
        //countrie factory
        $scope.countries = CountryFactory.query();
        $scope.selectedCountry = $scope.countries[0];


        //actions
        $scope.updateAuthority = function(data) {
            console.log(data);
            Notification.success("Autoritate adaugata");
        };
        $scope.addAuthority = function(data) {
            //create newAuthority object
            var newAuthority = {
                "authorityType": data.authorityType,
                "authorityName": data.authorityName,
                "country": {
                    "countryCod2": data.selectedCountry
                },
                "valid": true

            };
            //validation for each field
            for (var key in newAuthority) {
                var obj = newAuthority[key];
                if (obj === undefined) {
                    Notification.error("Elementul: " + key + " este obligatoriu!");
                }
            }

            //Perform actions with new object
            AuthoritiesFactory.create(newAuthority,
                function() {
                    Notification.success("Autoritate adaugata cu succes");
                    $scope.authoritiesList = AuthoritiesFactory.query();
                    $scope.addMode = false;
                    $scope.new = '';
                },
                function(error) {
                    Notification.error("A aparut o erroare" + error);
                }
            );
            //$scope.authoritiesList.push(newAuthority);
            //console.log(newAuthority);

        };
    }
]);
app.controller('EmailCountCtrl', ['$scope', '$http', 'EmailCountFactory', 'EmailListFactory', function($scope, $http, EmailCountFactory, EmailListFactory) {
    $scope.emailsCount = "";
    /*  $http.get("http://localhost:8080/mail-count")
          .then(function(response) {
              $scope.emailsCount = response.data;
              //console.log($scope.myWelcome);
          });
      var emaillength = EmailCountFactory.query();
      console.log(emaillength);

      */
    //$scope.emailsCount = emaillength.length;
    //$scope.emailsCount = length.length();
    //$scope.emailsCount = EmailCountFactory.query();
}]);
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

app.directive('createInterpelation', function() {
    return {
        restrict: 'E',
        templateUrl: 'app/templates/create-interpelation.html'
    };
});
