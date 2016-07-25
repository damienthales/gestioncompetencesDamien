(function() {
    'use strict';

    angular
        .module('gestioncompetencesApp')
        .controller('CVDetailController', CVDetailController);

    CVDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'CV', 'Collaborateur', 'Rubrique'];

    function CVDetailController($scope, $rootScope, $stateParams, entity, CV, Collaborateur, Rubrique) {
        var vm = this;

        vm.cV = entity;

        var unsubscribe = $rootScope.$on('gestioncompetencesApp:cVUpdate', function(event, result) {
            vm.cV = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
