/**
 * Main controller.
 *
 * @constructor
 * @ngInject
 * @export
 */
application.MainCtrl = function($scope, $modal, $log, $http, $routeSegment, $location, loader) {
    /**
     * Hide pre loader
     */
    jQuery('#loader').hide();

    $scope.$routeSegment = $routeSegment;
    $scope.loader = loader;

    /**
     * Example global configuration
     * @type {number}
     */
    application.$scope.testVar = 9000;

    /** @type {!angular.$http} */
    application.httpRequest = $http;

    /**
     * Modal component
     * @typedef {object}
     */
    application.$scope.$modal = $modal;

    $scope.$on('routeSegmentChange', function () {
        loader.show = false;
    });
};

/**
 *
 * @param $scope
 * @param $modalInstance
 * @param {string} message
 * @constructor
 */
application.MainCtrl.prototype.ModalAlertInstanceCtrl = function ($scope, $modalInstance, message) {
    $scope.alertMessage = message;
    $scope.alertClose = function () {
        $modalInstance.close();
    };
};

/**
 * Show alert
 * @param {string} message
 * @constructor
 * @ngInject
 * @export
 */
application.MainCtrl.prototype.showAlert = function (message) {
    application.$scope.$modal.open({
        templateUrl: 'modalAlert.html',
        controller: application.MainCtrl.prototype.ModalAlertInstanceCtrl,
        resolve: {
            message: function () {
                return message;
            }
        }
    });
};

/**
 * Make some functions as global
 */
application.showAlert = application.MainCtrl.prototype.showAlert;