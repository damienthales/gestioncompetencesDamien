(function() {
    'use strict';

    angular
        .module('gestioncompetencesApp')
        .controller('CVController', CVController);

    CVController.$inject = ['$scope', '$state', 'CV'];

    function CVController ($scope, $state, CV) {
        var vm = this;
        
        vm.cVS = [];

        loadAll();

        function loadAll() {
            CV.query(function(result) {
                vm.cVS = result;
            });
        }
    }
})();
