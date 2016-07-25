(function() {
    'use strict';

    angular
        .module('gestioncompetencesApp')
        .controller('CVDialogController', CVDialogController);

    CVDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'CV', 'Collaborateur', 'Rubrique'];

    function CVDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, CV, Collaborateur, Rubrique) {
        var vm = this;

        vm.cV = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.collaborateurs = Collaborateur.query();
        vm.rubriques = Rubrique.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.cV.id !== null) {
                CV.update(vm.cV, onSaveSuccess, onSaveError);
            } else {
                CV.save(vm.cV, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('gestioncompetencesApp:cVUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.dateCv = false;

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();
