'use strict'


var services = angular.module('ngAsiasApp.services', ['ngResource']);

var baseUrl = 'http://10.2.200.190:8080';

//INTERPELATION SERVICES
services.factory('InterpelationsFactory', function($resource) {
    return $resource(baseUrl + '/interpelations', {}, {
        query: {
            method: 'GET',
            isArray: true
        }
    });
});

services.factory('InterpelationPaginator', function($resource) {
    return $resource(baseUrl + '/paginator/:page/:size/:direction/:interpelationNr/:subjectType/:description', {}, {
        query: {
            method: 'GET'
        }
    });
});

services.factory('InterpelationCreateFactory', function($resource) {
    return $resource(baseUrl + '/interpelation', {}, {
        create: {
            method: 'POST'
        },
        delete: {
            method: "DELETE"
        },
        update: {
            method: 'PUT'
        }
    });
});

services.factory('InterpelationFactory', function($resource) {
    return $resource(baseUrl + '/interpelation', {}, {
        show: {
            method: 'GET'
        },
        update: {
            method: 'PUT'
        },
        delete: {
            method: 'DELETE',
            params: {
                id: '@id'
            }
        }
    });
});

services.factory('InterpelationSubjectFactory', function($resource) {
    return $resource(baseUrl + '/subjectTypes', {}, {
        query: {
            method: 'GET',
            isArray: true
        },
        create: {
            method: 'POST'
        }
    });
});

services.factory('InterpelationTypeFactory', function($resource) {
    return $resource(baseUrl + '/interpelationType', {}, {
        query: {
            method: 'GET',
            isArray: true
        }
    });
});


services.factory('InterpelationPriorityFactory', function($resource) {
    return $resource(baseUrl + '/interpelationPriority', {}, {
        query: {
            method: 'GET',
            isArray: true
        }
    });
});

services.factory('InterpelationStateFactory', function($resorce) {
    return $resorce(baseUrl + '/interpelationState', {}, {
        query: {
            method: 'GET',
            isArray: true
        }
    });
});

services.factory('InterpelationTreeFactory', function($resource) {
    return $resource(baseUrl + '/interpelation-tree/:id', {}, {
        query: {
            method: 'GET',
            isArray: true
        }
    });
});
// END INTERPELATION SERVICES

// COUNTRY SERVICES
services.factory('CountryFactory', function($resource) {
    return $resource(baseUrl + '/countries', {}, {
        query: {
            method: 'GET',
            isArray: true
        },
        create: {
            method: 'POST'
        }
    });
});


// CUSTOMS-OFFICES SERVICES
services.factory('CustomsOfficesFactory', function($resource) {
    return $resource(baseUrl + '/customsOffices', {}, {
        query: {
            method: 'GET',
            isArray: true
        },
        create: {
            method: 'POST'
        }
    });
});

//AUTHORITIES SERVICES
services.factory('AuthoritiesFactory', function($resource) {
    return $resource(baseUrl + '/authorities', {}, {
        query: {
            method: 'GET',
            isArray: true
        },
        create: {
            method: 'POST'
        }
    });
});


//Email services

services.factory('EmailListFactory', function($resource) {
    return $resource(baseUrl + '/listEmails', {}, {
        query: {
            method: 'GET',
            isArray: true
        }
    });
});

services.factory('EmailImportFactory', function($resource) {
    return $resource(baseUrl + '/editEmail/:id', {
        id: '@id'
    }, {
        query: {
            method: 'GET'
        },
        create: {
            method: 'POST',
            params: {
                id: '@id'
            }
        }
    });
});
services.factory('EmailCountFactory', function($resource) {
    return $resource(baseUrl + '/mail-count', {}, {
        query: {
            method: 'GET'
        }
    });
});


//ROUTES OF PROJECT

//Interpelations
//GET
