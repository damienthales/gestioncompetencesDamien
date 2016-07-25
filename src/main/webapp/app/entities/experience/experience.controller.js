(function() {
    'use strict';

    angular
        .module('gestioncompetencesApp')
        .controller('ExperienceController', ExperienceController);

    ExperienceController.$inject = ['$scope', '$state', 'Experience'];

    function ExperienceController ($scope, $state, Experience) {
        var vm = this;
        
        vm.experiences = [];

        loadAll();

        function loadAll() {
            Experience.query(function(result) {
                vm.experiences = result;
            });
        }
    }
})();
