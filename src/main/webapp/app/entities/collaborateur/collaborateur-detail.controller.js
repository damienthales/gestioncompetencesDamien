(function() {
    'use strict';

    angular
        .module('gestioncompetencesApp')
        .controller('CollaborateurDetailController', CollaborateurDetailController);

    CollaborateurDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Collaborateur', 'Rubrique', 'Email', 'Adresse', 'Fonction', 'Classification', 'Formation', 'Publication', 'Diplome', 'Experience', 'Cv', 'Competence'];

    function CollaborateurDetailController($scope, $rootScope, $stateParams, entity, Collaborateur, Rubrique, Email, Adresse, Fonction, Classification, Formation, Publication, Diplome, Experience, Cv, Competence) {
        var vm = this;

        vm.collaborateur = entity;

        var unsubscribe = $rootScope.$on('gestioncompetencesApp:collaborateurUpdate', function(event, result) {
            vm.collaborateur = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
