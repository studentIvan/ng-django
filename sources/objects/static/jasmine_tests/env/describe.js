var injector, httpService, r, results;

injector = angular.injector(['application_test', 'ng']);
httpService = injector.get('$http');
application.httpService = httpService;

describeAPI = function (methods) {
    describe('API testing', function () {

        beforeEach(function (done) {
            application.server.post('jasmine_tests_run_before', function () {
                done();
            });
        });

        methods();

        afterEach(function (done) {
            application.server.post('jasmine_tests_run_after', function () {
                done();
            });
        });

    });
}