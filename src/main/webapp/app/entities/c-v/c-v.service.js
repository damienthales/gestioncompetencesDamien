(function() {
    'use strict';
    angular
        .module('gestioncompetencesApp')
        .factory('CV', CV);

    CV.$inject = ['$resource', 'DateUtils'];

    function CV ($resource, DateUtils) {
        var resourceUrl =  'api/c-vs/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.dateCv = DateUtils.convertDateTimeFromServer(data.dateCv);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
