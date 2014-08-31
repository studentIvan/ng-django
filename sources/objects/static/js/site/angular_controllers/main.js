/**
 * Main controller.
 *
 * @constructor
 * @ngInject
 * @export
 */
application.MainCtrl = function($scope, $rootScope, $modal, $routeSegment, $location, loader) {
    /**
     * Hide pre loader
     */
    jQuery('#loader').hide();

    /**
     * @type {{ username: string, first_name: string, last_name: string,
     *          full_name: string, is_staff: boolean, is_superuser: boolean }}
     */
    CURRENT_USER;

    $scope.$routeSegment = $routeSegment;
    $scope.loader = loader;
    $rootScope.user = CURRENT_USER;

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