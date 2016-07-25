(function() {
    'use strict';

    angular
        .module('gestioncompetencesApp')
        .controller('ExperienceDetailController', ExperienceDetailController);

    ExperienceDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Experience', 'Collaborateur'];

    function ExperienceDetailController($scope, $rootScope, $stateParams, entity, Experience, Collaborateur) {
        var vm = this;

        vm.experience = entity;

        var unsubscribe = $rootScope.$on('gestioncompetencesApp:experienceUpdate', function(event, result) {
            vm.experience = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
