(function() {
    'use strict';

    angular
        .module('gestioncompetencesApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('fonction', {
            parent: 'entity',
            url: '/fonction',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Fonctions'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/fonction/fonctions.html',
                    controller: 'FonctionController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('fonction-detail', {
            parent: 'entity',
            url: '/fonction/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Fonction'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/fonction/fonction-detail.html',
                    controller: 'FonctionDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Fonction', function($stateParams, Fonction) {
                    return Fonction.get({id : $stateParams.id}).$promise;
                }]
            }
        })
        .state('fonction.new', {
            parent: 'fonction',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/fonction/fonction-dialog.html',
                    controller: 'FonctionDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                fonctionNom: null,
                                fonctionDateDebut: null,
                                fonctionDateFin: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('fonction', null, { reload: true });
                }, function() {
                    $state.go('fonction');
                });
            }]
        })
        .state('fonction.edit', {
            parent: 'fonction',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/fonction/fonction-dialog.html',
                    controller: 'FonctionDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Fonction', function(Fonction) {
                            return Fonction.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('fonction', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('fonction.delete', {
            parent: 'fonction',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/fonction/fonction-delete-dialog.html',
                    controller: 'FonctionDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Fonction', function(Fonction) {
                            return Fonction.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('fonction', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
