(function() {
    'use strict';

    angular
        .module('gestioncompetencesApp')
        .controller('CollaborateurDialogController', CollaborateurDialogController);

    CollaborateurDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Collaborateur', 'Rubrique', 'Email', 'Adresse', 'Fonction', 'Classification', 'Formation', 'Publication', 'Diplome', 'Experience', 'Cv', 'Competence'];

    function CollaborateurDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Collaborateur, Rubrique, Email, Adresse, Fonction, Classification, Formation, Publication, Diplome, Experience, Cv, Competence) {
        var vm = this;

        vm.collaborateur = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.rubriques = Rubrique.query();
        vm.emails = Email.query();
        vm.adresses = Adresse.query();
        vm.fonctions = Fonction.query();
        vm.classifications = Classification.query();
        vm.formations = Formation.query();
        vm.publications = Publication.query();
        vm.diplomes = Diplome.query();
        vm.experiences = Experience.query();
        vm.cvs = Cv.query();
        vm.competences = Competence.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.collaborateur.id !== null) {
                Collaborateur.update(vm.collaborateur, onSaveSuccess, onSaveError);
            } else {
                Collaborateur.save(vm.collaborateur, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('gestioncompetencesApp:collaborateurUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.collaborateurDateNaissance = false;

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();
