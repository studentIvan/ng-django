/**
 * Home controller.
 *
 * @constructor
 * @ngInject
 * @export
 */
application.controller('HomeCtrl', ['$api', function(api) {
    this.myColor = 'soft-blue';
    this.getObamaYears = function () {
        var homeCtrl = this;
        api.call('get_obama_years', function(response) {
            homeCtrl.obamaYears = response.result;
        });
    };
}]);