application.config(function ($routeSegmentProvider, $routeProvider, $locationProvider) {

// Configuring provider options

    $routeSegmentProvider.options.autoLoadTemplates = true;

// Setting routes. This consists of two parts:
// 1. `when` is similar to vanilla $route `when` but takes segment name instead of params hash
// 2. traversing through segment tree to set it up

    $routeSegmentProvider

        .when('/', 'home')
        .when('/another', 'another')

        .segment('home', {
            templateUrl: '/static/angular_templates/home.html',
            controller: this.MainCtrl
        })

        .segment('another', {
            templateUrl: '/static/angular_templates/another.html',
            controller: this.AnotherCtrl
        });


    $routeProvider.otherwise({redirectTo: '/'});
    $locationProvider.html5Mode(true);
});

application.value('loader', {show: false});