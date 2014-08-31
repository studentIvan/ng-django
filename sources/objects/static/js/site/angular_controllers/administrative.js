/**
 * Administrative controller.
 *
 * @constructor
 * @ngInject
 * @export
 */
application.controller('Administrative', ['$api', '$scope', function(api, scope) {
    api.call('get_administrative', function (response) {
        scope.helloAdmin = response.result
    })
}]);
