application.config(function ($routeSegmentProvider, $routeProvider, $locationProvider) {

// Configuring provider options

    $routeSegmentProvider.options.autoLoadTemplates = true;

// Setting routes. This consists of two parts:
// 1. `when` is similar to vanilla $route `when` but takes segment name instead of params hash
// 2. traversing through segment tree to set it up

    $routeSegmentProvider

        .when('/', 'home')
        .when('/another/', 'another')
        .when('/another/second_level/', 'another.second_level')

        .segment('home', {
            templateUrl: '/static/angular_templates/home.html?v=' + VERSION,
            controller: this.MainCtrl
        })

        .segment('another', {
            templateUrl: '/static/angular_templates/another.html?v=' + VERSION,
            controller: this.AnotherCtrl
        })

        .within()

            .segment('second_level', {
                templateUrl: '/static/angular_templates/another_second_level.html?v=' + VERSION,
                controller: this.SecondCtrl
            })

        .up()
    ;

    /**
     * ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
     * DO NOT REMOVE LAST .up() with ;
     * FOR THE GULP TASK MANAGER AUTOMATIC
     * ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
     */

    $routeProvider.otherwise({redirectTo: '/'});
    $locationProvider.html5Mode(true);
});

application.value('loader', {show: false});