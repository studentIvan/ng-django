/**
 * Angular application
 * @see http://google-styleguide.googlecode.com/svn/trunk/angularjs-google-style.html
 * @type {*}
 */
application = angular.module('application',
    ['ngAnimate', 'ngRoute', 'route-segment', 'view-segment', 'ui.bootstrap']);

application.config(function ($interpolateProvider) {
    $interpolateProvider.startSymbol('{[{');
    $interpolateProvider.endSymbol('}]}');
});

/**
 * localStorage helper
 * @type {{currentDBName: string, get: Function, set: Function}}
 * @export
 */
application.localStorage = {
    /**
     * Unique value for your project
     */
    currentDBName: 'angular_fsgh90rghsfhudsnv',

    /**
     *
     * @param {string} key
     * @param {boolean} fromJSON
     * @returns {*}
     */
    get: function (key, fromJSON) {
        var r = window.localStorage.getItem(
            this.currentDBName + '-' + key
        );
        return (typeof r == 'undefined') ?
            false : (fromJSON ? JSON.parse(r) : r);
    },

    /**
     *
     * @param {string} key
     * @param {*} value
     * @param {boolean} toJSON
     */
    set: function (key, value, toJSON) {
        value = toJSON ? JSON.stringify(value) : value;
        window.localStorage.setItem(
            this.currentDBName + '-' + key, value
        )
    }
};

/**
 * ng-enter support
 */
application.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter, {'event': event});
                });

                event.preventDefault();
            }
        });
    };
});

/**
 * focus support
 */
application.directive('focusMe', function ($timeout) {
    return {
        scope: { trigger: '@focusMe' },
        /**
         *
         * @param scope
         * @param element
         */
        link: function (scope, element) {
            scope.$watch('trigger', function (value) {
                if (value === "true") {
                    $timeout(function () {
                        element[0].focus();
                    });
                }
            });
        }
    };
});

/**
 * Moment.js
 * @type {*}
 * @export
 */
application.moment = moment;
application.moment.lang('ru');

/**
 * Server API Helper
 * @type {{errorCallback: Function, successCallback: Function, post: Function}}
 * @export
 */
application.server = {
    /**
     * Default error callback
     * @param {object} response
     */
    errorCallback: function(response) {
        console.error(response)
    },

    /**
     * Default success callback
     * @param {object} response
     */
    successCallback: function(response) {
        console.info(response)
    },

    /**
     * POST Api Request
     * Special for Django
     * You can pass successCallback only instead kwargs
     *
     * @param {string} method
     * @param {object|function} kwargs
     * @param {function} successCallback
     * @param {function} errorCallback
     * @export
     */
    post: function(method, kwargs, successCallback, errorCallback) {
        var $http = application.httpRequest;

        if (!method) {
            throw 'You want to select a method'
        }

        if (!$http) {
            throw 'application.httpRequest is not defined'
        }

        if (typeof kwargs == 'function' && !successCallback) {
            successCallback = kwargs;
            kwargs = {};
        }

        successCallback = successCallback || this.successCallback;
        errorCallback = errorCallback || this.errorCallback;
        kwargs = kwargs || {};
        kwargs['function'] = method;

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

/**
 * Global registry
 * @type {object}
 * @export
 */
application.$scope = {};