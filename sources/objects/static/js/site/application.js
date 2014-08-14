/**
 * Angular application
 * @see http://google-styleguide.googlecode.com/svn/trunk/angularjs-google-style.html
 * @type {*}
 */
application = angular.module('application',
    ['ngAnimate', 'ngRoute', 'route-segment', 'view-segment', 'ui.bootstrap']);

/**
 * Use alternative braces for angular application because the Django has a same braces
 */
application.config(function ($interpolateProvider, $controllerProvider) {
    $interpolateProvider.startSymbol('{[{');
    $interpolateProvider.endSymbol('}]}');
    $controllerProvider.allowGlobals();
});

/**
 * @see https://app.pusher.com
 * @type {{use: use}}
 */
application.pusher = {
    /**
     * Go pusher within global API
     */
    use: function() {
        /**
         * Trying to connect to the pusher
         */
        try {
            /**
             * @type {string}
             */
            PUSHER_KEY;

            /**
             * @type {Pusher}
             */
            application.pusher = PUSHER_KEY ? new Pusher(PUSHER_KEY) : false;
            application.pusher.use = function() {}
        }
        catch (e) {
            /**
             * @type {Pusher}
             */
            application.pusher = false;
        }

        if (!application.pusher) {
            throw 'The Pusher does not connected'
        }
    }
};

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
 * Input daemon
 */
application.directive('ngDelay', ['$timeout', function ($timeout) {
    return {
        restrict: 'A',
        scope: true,
        /**
         * @param element
         * @param attributes
         * @returns {undefined | {post: post}}
         */
        compile: function (element, attributes) {
            var expression = attributes['ngChange'];
            if (!expression)
                return;

            var ngModel = attributes['ngModel'];
            if (ngModel) attributes['ngModel'] = '$parent.' + ngModel;
            attributes['ngChange'] = '$$delay.execute()';

            return {
                post: function (scope, element, attributes) {
                    scope.$$delay = {
                        expression: expression,
                        delay: scope.$eval(attributes['ngDelay']),
                        execute: function () {
                            var state = scope.$$delay;
                            state.then = Date.now();
                            $timeout(function () {
                                if (Date.now() - state.then >= state.delay)
                                    scope.$parent.$eval(expression);
                            }, state.delay);
                        }
                    };
                }
            }
        }
    };
}]);

/**
 * Moment.js
 * @type {*}
 * @export
 */
moment;
application.moment = moment;
application.moment.lang('ru');

/**
 * Server API Helper
 * @type {{errorCallback: errorCallback, successCallback: successCallback}}
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
        if (application.showAlert) {
            var errors = {
                400: ['Bad Request', 'Во время выполнения запроса возникла ошибка, ' +
                    'проверьте данные ещё раз и исправьте при необходимости.'],
                403: ['Forbidden', 'Данное действие для вас запрещено.'],
                404: ['Not Found', 'Не удалось найти запрашиваемый элемент.'],
                409: ['Conflict', 'Во время выполнения запроса возникла ошибка конфликта данных.'],
                412: ['Precondition Failed', 'Неверный запрос, измените его и попробуйте снова.'],
                423: ['Locked', 'Ресурс из запроса заблокирован от применения к нему указанного метода.'],
                429: ['Too Many Requests', 'Очень много запросов, попробуйте позже.'],
                449: ['Retry With', 'Поступило недостаточно информации.']
            };
            application.showAlert('Ошибка', (errors[status][0] == response.error ?
                errors[status][1] : response.error))
        } else {
            console.error(response, status)
        }
    },

    /**
     * Default success callback
     * @param {object} response
     */
    successCallback: function(response) {
        console.info(response)
    }
};

/**
 * Moment.js factory
 * @module
 */
application.factory('$moment', [function () {
    return application.moment
}]);

/**
 * Common modal factory
 * @module
 */
application.factory('$modal2', [function () {
    return application.modalService
}]);

/**
 * API factory
 * @module
 */
application.factory('$api', ['$http', function (httpRequest) {
    return {
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
        call: function (method, kwargs, successCallback, errorCallback) {
            if (!method) {
                throw 'You want to select a method'
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

            successCallback = successCallback || application.server.successCallback;
            errorCallback = errorCallback || application.server.errorCallback;
            kwargs = kwargs || {};
            kwargs['function'] = method;

            /**
             * @see https://docs.angularjs.org/api/ng/service/$http
             */
            var request = httpRequest({
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
    }
}]);