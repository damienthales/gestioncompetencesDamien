(function() {
    'use strict';

    angular
        .module('gestioncompetencesApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('c-v', {
            parent: 'entity',
            url: '/c-v',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'CVS'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/c-v/c-vs.html',
                    controller: 'CVController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('c-v-detail', {
            parent: 'entity',
            url: '/c-v/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'CV'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/c-v/c-v-detail.html',
                    controller: 'CVDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'CV', function($stateParams, CV) {
                    return CV.get({id : $stateParams.id}).$promise;
                }]
            }
        })
        .state('c-v.new', {
            parent: 'c-v',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/c-v/c-v-dialog.html',
                    controller: 'CVDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                dateCv: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('c-v', null, { reload: true });
                }, function() {
                    $state.go('c-v');
                });
            }]
        })
        .state('c-v.edit', {
            parent: 'c-v',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/c-v/c-v-dialog.html',
                    controller: 'CVDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['CV', function(CV) {
                            return CV.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('c-v', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('c-v.delete', {
            parent: 'c-v',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/c-v/c-v-delete-dialog.html',
                    controller: 'CVDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['CV', function(CV) {
                            return CV.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('c-v', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
