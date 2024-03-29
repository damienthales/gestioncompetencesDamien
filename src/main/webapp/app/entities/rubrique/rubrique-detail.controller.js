(function() {
    'use strict';

    angular
        .module('gestioncompetencesApp')
        .controller('RubriqueDetailController', RubriqueDetailController);

    RubriqueDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Rubrique', 'Collaborateur', 'Cv'];

    function RubriqueDetailController($scope, $rootScope, $stateParams, entity, Rubrique, Collaborateur, Cv) {
        var vm = this;

        vm.rubrique = entity;

        var unsubscribe = $rootScope.$on('gestioncompetencesApp:rubriqueUpdate', function(event, result) {
            vm.rubrique = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
