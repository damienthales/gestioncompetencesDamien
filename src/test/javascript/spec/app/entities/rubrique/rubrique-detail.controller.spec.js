'use strict';

describe('Controller Tests', function() {

    describe('Rubrique Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockRubrique, MockCollaborateur, MockCv;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockRubrique = jasmine.createSpy('MockRubrique');
            MockCollaborateur = jasmine.createSpy('MockCollaborateur');
            MockCv = jasmine.createSpy('MockCv');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'Rubrique': MockRubrique,
                'Collaborateur': MockCollaborateur,
                'Cv': MockCv
            };
            createController = function() {
                $injector.get('$controller')("RubriqueDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'gestioncompetencesApp:rubriqueUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
