'use strict';
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps');

var staticPath = 'objects/static';

var paths = {
    scripts: [
        staticPath + '/js/site/application.js',
        staticPath + '/js/site/filters.js',
        staticPath + '/js/site/angular_controllers/*.js',
        staticPath + '/js/site/routing.js'
    ]
};

gulp.task('scripts', function () {
    return gulp.src(paths.scripts)
        .pipe(concat('all.min.js'))
        .pipe(gulp.dest(staticPath + '/assets/js'));
});

gulp.task('default', ['scripts']);