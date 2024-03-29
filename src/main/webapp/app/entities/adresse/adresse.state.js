(function() {
    'use strict';

    angular
        .module('gestioncompetencesApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('adresse', {
            parent: 'entity',
            url: '/adresse',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Adresses'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/adresse/adresses.html',
                    controller: 'AdresseController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('adresse-detail', {
            parent: 'entity',
            url: '/adresse/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Adresse'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/adresse/adresse-detail.html',
                    controller: 'AdresseDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Adresse', function($stateParams, Adresse) {
                    return Adresse.get({id : $stateParams.id}).$promise;
                }]
            }
        })
        .state('adresse.new', {
            parent: 'adresse',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/adresse/adresse-dialog.html',
                    controller: 'AdresseDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                adresseNumero: null,
                                adresseVoie: null,
                                adresseVoie2: null,
                                adresseCodePostal: null,
                                adresseVille: null,
                                adressePays: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('adresse', null, { reload: true });
                }, function() {
                    $state.go('adresse');
                });
            }]
        })
        .state('adresse.edit', {
            parent: 'adresse',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/adresse/adresse-dialog.html',
                    controller: 'AdresseDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Adresse', function(Adresse) {
                            return Adresse.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('adresse', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('adresse.delete', {
            parent: 'adresse',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/adresse/adresse-delete-dialog.html',
                    controller: 'AdresseDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Adresse', function(Adresse) {
                            return Adresse.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('adresse', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
