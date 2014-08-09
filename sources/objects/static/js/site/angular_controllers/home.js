/**
 * Home controller.
 *
 * @constructor
 * @ngInject
 * @export
 */
application.HomeCtrl = function ($api) {
    /**
     * @type {string}
     * @export
     */
    this.myColor = 'red';
    this.api = $api;
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
    this.api.call('get_obama_years', function(response) {
        homeCtrl.obamaYears = response.result;
    });
};