(function() {
    'use strict';
    angular
        .module('gestioncompetencesApp')
        .factory('Experience', Experience);

    Experience.$inject = ['$resource'];

    function Experience ($resource) {
        var resourceUrl =  'api/experiences/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
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
