'use strict';

describe('Controller Tests', function() {

    describe('Cv Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockCv, MockCollaborateur, MockRubrique;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockCv = jasmine.createSpy('MockCv');
            MockCollaborateur = jasmine.createSpy('MockCollaborateur');
            MockRubrique = jasmine.createSpy('MockRubrique');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'Cv': MockCv,
                'Collaborateur': MockCollaborateur,
                'Rubrique': MockRubrique
            };
            createController = function() {
                $injector.get('$controller')("CvDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'gestioncompetencesApp:cvUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
