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

    /**
     * @type {function}
     * @export
     */
    this.apiCall = application.server.post;
    //application.server.apiRegister = this;

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
    this.apiCall('yet_another_api_function', function(response) {
        console.info('yet another was called', response.result)
    });
};