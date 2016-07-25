(function() {
    'use strict';

    angular
        .module('gestioncompetencesApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('classification', {
            parent: 'entity',
            url: '/classification',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Classifications'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/classification/classifications.html',
                    controller: 'ClassificationController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('classification-detail', {
            parent: 'entity',
            url: '/classification/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Classification'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/classification/classification-detail.html',
                    controller: 'ClassificationDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Classification', function($stateParams, Classification) {
                    return Classification.get({id : $stateParams.id}).$promise;
                }]
            }
        })
        .state('classification.new', {
            parent: 'classification',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/classification/classification-dialog.html',
                    controller: 'ClassificationDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                classificationNom: null,
                                classificationDateDebut: null,
                                classificationDateFin: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('classification', null, { reload: true });
                }, function() {
                    $state.go('classification');
                });
            }]
        })
        .state('classification.edit', {
            parent: 'classification',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/classification/classification-dialog.html',
                    controller: 'ClassificationDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Classification', function(Classification) {
                            return Classification.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('classification', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('classification.delete', {
            parent: 'classification',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/classification/classification-delete-dialog.html',
                    controller: 'ClassificationDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Classification', function(Classification) {
                            return Classification.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('classification', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
