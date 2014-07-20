/**
 * Home controller.
 *
 * @constructor
 * @ngInject
 * @export
 */
application.HomeCtrl = function () {
    /**
     * @type {string}
     * @export
     */
    this.myColor = 'red';

    application.apiClient(this);

    if (application.$scope.testVar == 9000) {
        //application.showAlert('Angular.js');
    }
};


/**
 * @param {number} a
 * @param {number} b
 * @export
 */
application.HomeCtrl.prototype.add = function (a, b) {
    return a + b;
};

/**
 * api test
 */
application.HomeCtrl.prototype.getObamaYears = function () {
    var homeCtrl = this;
    this.apiCall('get_obama_years', function(response) {
        homeCtrl.obamaYears = response.result;
    });
};