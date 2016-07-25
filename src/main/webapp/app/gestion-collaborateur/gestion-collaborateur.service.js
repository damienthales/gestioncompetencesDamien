(function() {
    'use strict';
    angular
        .module('gestioncompetencesApp')
        .factory('GestionCollaborateur', GestionCollaborateur);

    GestionCollaborateur.$inject = ['$resource'];

    function GestionCollaborateur ($resource) {
    	
        var resourceUrl =  'api/gestion-collaborateur/';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: false},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
