application = angular.module('application_test', []);

/**
 * Server API Helper
 * @type {{errorCallback: errorCallback, successCallback: successCallback, post: post}}
 * @export
 */
application.server = {
    /**
     * Default error callback
     * @param {object} response
     * @param {number} status
     */
    errorCallback: function (response, status) {
        response = response || {
            error: 'Server Error'
        };
        console.error(response, status)
    },

    /**
     * Default success callback
     * @param {object} response
     */
    successCallback: function (response) {
        console.info(response)
    },

    post: function (method, kwargs, successCallback, errorCallback) {
        var $http = application.httpService;

        if (!method) {
            throw 'You want to select a method'
        }

        if (!$http) {
            throw '$http is not defined'
        }

        /**
         * Different kinds of call:
         * post('example', kwargs, success, error)
         * post('example', success, error)
         * post('example', success)
         */
        if (typeof kwargs == 'function' && typeof successCallback == 'function' && !errorCallback) {
            errorCallback = successCallback;
            successCallback = kwargs;
            kwargs = {};
        } else if (typeof kwargs == 'function' && !successCallback) {
            successCallback = kwargs;
            kwargs = {};
        }

        successCallback = successCallback || this.successCallback;
        errorCallback = errorCallback || this.errorCallback;
        kwargs = kwargs || {};
        kwargs['function'] = method;

        /**
         * @see https://docs.angularjs.org/api/ng/service/$http
         */
        var request = $http({
            method: 'POST',
            url: '/api/',
            data: kwargs,
            cache: false,
            timeout: 10e3,
            responseType: 'json',
            xsrfHeaderName: 'X-CSRFToken',
            xsrfCookieName: 'csrftoken'
        });

        request.success(successCallback);
        request.error(errorCallback);
    }
};
