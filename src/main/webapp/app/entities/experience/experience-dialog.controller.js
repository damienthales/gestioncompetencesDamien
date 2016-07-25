(function() {
    'use strict';

    angular
        .module('gestioncompetencesApp')
        .controller('ExperienceDialogController', ExperienceDialogController);

    ExperienceDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Experience', 'Collaborateur'];

    function ExperienceDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Experience, Collaborateur) {
        var vm = this;

        vm.experience = entity;
        vm.clear = clear;
        vm.save = save;
        vm.collaborateurs = Collaborateur.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.experience.id !== null) {
                Experience.update(vm.experience, onSaveSuccess, onSaveError);
            } else {
                Experience.save(vm.experience, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('gestioncompetencesApp:experienceUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
