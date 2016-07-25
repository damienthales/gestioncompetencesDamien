(function() {
    'use strict';

    angular
        .module('gestioncompetencesApp')
        .controller('FonctionController', FonctionController);

    FonctionController.$inject = ['$scope', '$state', 'Fonction'];

    function FonctionController ($scope, $state, Fonction) {
        var vm = this;
        
        vm.fonctions = [];

        loadAll();

        function loadAll() {
            Fonction.query(function(result) {
                vm.fonctions = result;
            });
        }
    }
})();
