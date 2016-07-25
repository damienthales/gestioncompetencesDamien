'use strict';

describe('Controller Tests', function() {

    describe('Collaborateur Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockCollaborateur, MockRubrique, MockEmail, MockAdresse, MockFonction, MockClassification, MockFormation, MockPublication, MockDiplome, MockExperience, MockCv, MockCompetence;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockCollaborateur = jasmine.createSpy('MockCollaborateur');
            MockRubrique = jasmine.createSpy('MockRubrique');
            MockEmail = jasmine.createSpy('MockEmail');
            MockAdresse = jasmine.createSpy('MockAdresse');
            MockFonction = jasmine.createSpy('MockFonction');
            MockClassification = jasmine.createSpy('MockClassification');
            MockFormation = jasmine.createSpy('MockFormation');
            MockPublication = jasmine.createSpy('MockPublication');
            MockDiplome = jasmine.createSpy('MockDiplome');
            MockExperience = jasmine.createSpy('MockExperience');
            MockCv = jasmine.createSpy('MockCv');
            MockCompetence = jasmine.createSpy('MockCompetence');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'Collaborateur': MockCollaborateur,
                'Rubrique': MockRubrique,
                'Email': MockEmail,
                'Adresse': MockAdresse,
                'Fonction': MockFonction,
                'Classification': MockClassification,
                'Formation': MockFormation,
                'Publication': MockPublication,
                'Diplome': MockDiplome,
                'Experience': MockExperience,
                'Cv': MockCv,
                'Competence': MockCompetence
            };
            createController = function() {
                $injector.get('$controller')("CollaborateurDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'gestioncompetencesApp:collaborateurUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
