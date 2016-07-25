(function() {
    'use strict';

    angular
        .module('gestioncompetencesApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('cv', {
            parent: 'entity',
            url: '/cv',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Cvs'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/cv/cvs.html',
                    controller: 'CvController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('cv-detail', {
            parent: 'entity',
            url: '/cv/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Cv'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/cv/cv-detail.html',
                    controller: 'CvDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Cv', function($stateParams, Cv) {
                    return Cv.get({id : $stateParams.id}).$promise;
                }]
            }
        })
        .state('cv.new', {
            parent: 'cv',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/cv/cv-dialog.html',
                    controller: 'CvDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                dateCv: null,
                                libelle: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('cv', null, { reload: true });
                }, function() {
                    $state.go('cv');
                });
            }]
        })
        .state('cv.edit', {
            parent: 'cv',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/cv/cv-dialog.html',
                    controller: 'CvDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Cv', function(Cv) {
                            return Cv.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('cv', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('cv.delete', {
            parent: 'cv',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/cv/cv-delete-dialog.html',
                    controller: 'CvDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Cv', function(Cv) {
                            return Cv.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('cv', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
