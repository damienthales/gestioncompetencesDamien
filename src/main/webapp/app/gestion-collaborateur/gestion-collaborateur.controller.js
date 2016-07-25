(function() {
    'use strict';

    angular
        .module('gestioncompetencesApp')
        .controller('GestionCollaborateurController', GestionCollaborateurController);

    GestionCollaborateurController.$inject = ['$scope', '$state', 'GestionCollaborateur'];

    function GestionCollaborateurController ($scope, $state, GestionCollaborateur) {
        var vm = this;
               
        vm.gestionCollaborateur = {};

		
	
        loadFirst();
        

        function loadFirst() {
            GestionCollaborateur.query(function(result) {
            	
                vm.gestionCollaborateur = result;
            });
        }
    }
})();
