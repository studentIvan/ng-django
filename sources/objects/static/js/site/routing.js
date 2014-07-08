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
        .when('/another/second_level/third_level/', 'another.second_level.third_level')
        .when('/another/second_level/third_level/fourth_level/', 'another.second_level.third_level.fourth_level')

        .segment('home', {
            templateUrl: '/static/angular_templates/home.html',
            controller: this.MainCtrl
        })

        .segment('another', {
            templateUrl: '/static/angular_templates/another.html',
            controller: this.AnotherCtrl
        })

        .within()

            .segment('second_level', {
                templateUrl: '/static/angular_templates/another_second_level.html',
                controller: this.AnotherCtrlSecondLevel
            })

            .within()

                .segment('third_level', {
                    templateUrl: '/static/angular_templates/another_third_level.html',
                    controller: this.AnotherCtrlThirdLevel
                })

                .within()

                    .segment('fourth_level', {
                        templateUrl: '/static/angular_templates/another_fourth_level.html',
                        controller: this.AnotherCtrlFourthLevel
                    })

    ;


    $routeProvider.otherwise({redirectTo: '/'});
    $locationProvider.html5Mode(true);
});

application.value('loader', {show: false});