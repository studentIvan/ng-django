/**
 * Main controller.
 *
 * @constructor
 * @ngInject
 * @export
 */
application.MainCtrl = function($scope, $modal, $routeSegment, $location, loader) {
    /**
     * Hide pre loader
     */
    jQuery('#loader').hide();

    $scope.$routeSegment = $routeSegment;
    $scope.loader = loader;

    /**
     * Modal component
     * @typedef {object}
     */
    application.modalService = $modal;

    $scope.$on('routeSegmentChange', function () {
        loader.show = false;
    });
};

/**
 *
 * @param $scope
 * @param $modalInstance
 * @param {string} title
 * @param {string} message
 * @constructor
 */
application.MainCtrl.prototype.ModalAlertInstanceCtrl = function ($scope, $modalInstance, title, message) {
    $scope.alertTitle = title;
    $scope.alertMessage = message;
    $scope.alertClose = function () {
        $modalInstance.close();
    };
};

/**
 * Show alert
 * @param {string} title
 * @param {string} message
 * @constructor
 * @ngInject
 * @export
 */
application.MainCtrl.prototype.showAlert = function (title, message) {
    if (!message && title) {
        message = title;
        title = 'Всплывающее сообщение';
    }
    application.modalService.open({
        templateUrl: 'modalAlert.html',
        controller: application.MainCtrl.prototype.ModalAlertInstanceCtrl,
        resolve: {
            title: function() {
                return title
            },
            message: function () {
                return message
            }
        }
    });
};

/**
 * Make some functions as global
 */
application.showAlert = application.MainCtrl.prototype.showAlert;