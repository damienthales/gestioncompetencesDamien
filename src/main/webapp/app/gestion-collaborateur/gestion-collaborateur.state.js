(function() {
    'use strict';

    angular
        .module('gestioncompetencesApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('gestion-collaborateur', {
            parent: 'app',
            url: '/gestion-collaborateur',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'GestionCollaborateur'
            },
            views: {
                'content@': {
                    templateUrl: 'app/gestion-collaborateur/gestion-collaborateur.html',
                    controller: 'GestionCollaborateurController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('gestion-collaborateur.new', {
            parent: 'gestion-collaborateur',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/gestion-collaborateur/gestion-collaborateur-dialog.html',
                    controller: 'GestionCollaborateurDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                collaborateurNom: null,
                                collaborateurPrenom: null,
                                collaborateurDateNaissance: null,
                                collaborateurSexe: null,
                                collaborateurEtatMarital: null,
                                collaborateurNombreEnfant: null,
                                collaborateurLangue: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('gestion-collaborateur', null, { reload: true });
                }, function() {
                    $state.go('gestion-collaborateur');
                });
            }]
        })
    }

})();
