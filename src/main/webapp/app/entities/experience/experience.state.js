(function() {
    'use strict';

    angular
        .module('gestioncompetencesApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('experience', {
            parent: 'entity',
            url: '/experience',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Experiences'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/experience/experiences.html',
                    controller: 'ExperienceController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('experience-detail', {
            parent: 'entity',
            url: '/experience/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Experience'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/experience/experience-detail.html',
                    controller: 'ExperienceDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Experience', function($stateParams, Experience) {
                    return Experience.get({id : $stateParams.id}).$promise;
                }]
            }
        })
        .state('experience.new', {
            parent: 'experience',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/experience/experience-dialog.html',
                    controller: 'ExperienceDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                experienceNom: null,
                                experienceTypeExperience: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('experience', null, { reload: true });
                }, function() {
                    $state.go('experience');
                });
            }]
        })
        .state('experience.edit', {
            parent: 'experience',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/experience/experience-dialog.html',
                    controller: 'ExperienceDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Experience', function(Experience) {
                            return Experience.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('experience', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('experience.delete', {
            parent: 'experience',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/experience/experience-delete-dialog.html',
                    controller: 'ExperienceDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Experience', function(Experience) {
                            return Experience.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('experience', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
