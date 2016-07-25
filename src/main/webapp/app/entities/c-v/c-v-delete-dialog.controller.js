(function() {
    'use strict';

    angular
        .module('gestioncompetencesApp')
        .controller('CVDeleteController',CVDeleteController);

    CVDeleteController.$inject = ['$uibModalInstance', 'entity', 'CV'];

    function CVDeleteController($uibModalInstance, entity, CV) {
        var vm = this;

        vm.cV = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            CV.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
