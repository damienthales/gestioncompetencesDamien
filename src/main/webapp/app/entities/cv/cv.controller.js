(function() {
    'use strict';

    angular
        .module('gestioncompetencesApp')
        .controller('CvController', CvController);

    CvController.$inject = ['$scope', '$state', 'Cv'];

    function CvController ($scope, $state, Cv) {
        var vm = this;
        
        vm.cvs = [];

        loadAll();

        function loadAll() {
            Cv.query(function(result) {
                vm.cvs = result;
            });
        }
    }
})();
