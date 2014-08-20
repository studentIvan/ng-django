'use strict';
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    combineCSS = require('combine-css'),
    minifyCSS = require('gulp-minify-css'),
    args = require('yargs').argv,
    fs = require('fs');

var staticPath = 'objects/static';

var paths = {
    scripts: [
        staticPath + '/js/site/application.js',
        staticPath + '/js/site/directives.js',
        staticPath + '/js/site/filters.js',
        staticPath + '/js/site/angular_controllers/*.js',
        staticPath + '/js/site/routing.js'
    ],
    styles: [
        staticPath + '/css/bootstrap/bootstrap.min.css',
        staticPath + '/css/font_awesome/font-awesome.min.css',
        staticPath + '/css/animate/animate.css',
        staticPath + '/css/select2/select2.css',
        staticPath + '/css/site/*.css'
    ]
};

var angularTemplateTemplate =
    '<div ng-controller="___CONTROLLER_F___ as ___CONTROLLER___"></div>';

var angularControllerTemplate = "/**\n" +
" * ___CONTROLLER_F___ controller.\n" +
" *\n" +
" * @constructor\n" +
" * @ngInject\n" +
" * @export\n" +
" */\n" +
"application.controller('___CONTROLLER_F___', ['$api', function(api) {\n" +
"    // do nothing\n" +
"}]);\n";

var routingWhenTemplate = "\n" +
"        .when('/___ROUTE___/', '___CONTROLLER___')\n";

var routingSegmentTemplate = "\n\n" +
"        .segment('___CONTROLLER___', {\n" +
"            templateUrl: '/static/angular_templates/___CONTROLLER___.html',\n" +
"            controller: this.___CONTROLLER_F___\n" +
"        })\n";

/**
 *
 * @param {string} string
 * @returns {string}
 */
function capitaliseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

/**
 *
 * @param filename
 * @param string
 * @returns {*}
 */
function stringSrc(filename, string) {
    var src = require('stream').Readable({ objectMode: true });
    src._read = function () {
        this.push(new gutil.File({ cwd: "", base: "", path: filename, contents: new Buffer(string) }));
        this.push(null)
    };
    return src
}

/**
 *
 * @param {string} str
 * @param {string} ctrlF
 * @param {string} ctrl
 * @param {string} r
 * @returns {string}
 */
function templateIt(str, ctrlF, ctrl, r) {
    return str
        .replace('___CONTROLLER_F___', ctrlF)
        .replace('___CONTROLLER___', ctrl)
        .replace('___ROUTE___', r)
        .replace('___CONTROLLER___', ctrl)
        .replace('___CONTROLLER_F___', ctrlF)
}

gulp.task('create', function () {
    if ((args.controller && args.controller.length > 3 && !args.route) ||
        (args.controller && args.controller.length > 3 && args.route && args.route.length <= 3)) {
        args.route = args.controller
    }
    if (args.controller && args.controller.length > 3
        && args.route && args.route.length > 3) {
        var $$$tplLocation = staticPath + '/angular_templates/' + args.controller + '.html';
        var $$$ctrlLocation = staticPath + '/js/site/angular_controllers/' + args.controller + '.js';
        var $$$routingLocation = staticPath + '/js/site/routing.js';
        var $$$controller = args.controller;
        var $$$controllerF = capitaliseFirstLetter($$$controller);
        var $$$route = args.route;

        stringSrc($$$tplLocation,
            templateIt(angularTemplateTemplate, $$$controllerF, $$$controller, $$$route))
            .pipe(gulp.dest('./'));

        stringSrc($$$ctrlLocation,
            templateIt(angularControllerTemplate, $$$controllerF, $$$controller, $$$route))
            .pipe(gulp.dest('./'));

        fs.readFile($$$routingLocation, 'utf8', function (err, data) {
            stringSrc($$$routingLocation, data
                .replace(/(\.when.+\))((\s+)\.segment)/, '$1<<<>>>$2')
                .replace(/(\.up\(\))(\s+;)/, '$1_______________________________\n        $1$2')
                .replace('<<<>>>',
                    templateIt(routingWhenTemplate, $$$controllerF, $$$controller, $$$route))
                .replace('_______________________________',
                    templateIt(routingSegmentTemplate, $$$controllerF, $$$controller, $$$route))
            ).pipe(gulp.dest('./'));
        });

        return true
    } else {
        console.log('error: create')
    }
    return true
});

gulp.task('scripts', function () {
    return gulp.src(paths.scripts)
        .pipe(concat('site.min.js'))
        .pipe(gulp.dest(staticPath + '/assets/js'));
});

gulp.task('styles', function() {
    return gulp.src(paths.styles)
        .pipe(combineCSS({lengthLimit: 256, prefix: '_m-', selectorLimit: 4080}))
        .pipe(minifyCSS({keepSpecialComments: 0, keepBreaks: false}))
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest(staticPath + '/assets/css'));
});

gulp.task('help', function () {
    console.log('gulp <task> <other task>\t\t\t\t\trun gulp task');
    console.log('gulp styles\t\t\t\t\t\t\tcompile css files to /assets/css/style.min.css');
    console.log('gulp scripts\t\t\t\t\t\t\tcompile angular site javascript files to /assets/js/site.min.js');
    console.log('gulp create --controller <controller> [--route <route>]\t\tbuild angular controller + template + route');
    return true
});

gulp.task('default', ['scripts', 'styles']);