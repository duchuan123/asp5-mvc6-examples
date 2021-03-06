/// <binding Clean='clean' />
'use strict';
/* jshint node: true */
var gulp = require("gulp"),
  rimraf = require("rimraf"),
  concat = require("gulp-concat"),
  cssmin = require("gulp-cssmin"),
  uglify = require("gulp-uglify"),
  project = require("./project.json"),
  mainBowerFiles = require('gulp-main-bower-files');

var webroot = "./" + project.webroot + "/";
var paths = {
  webroot: webroot,
  concatCssDest: webroot + "css/site.min.css",
  concatJsDest: webroot + "js/site.min.js",
  css: webroot + "css/**/*.css",
  js: webroot + "js/**/*.js",
  lib: webroot + "lib/",
  minCss: webroot + "css/**/*.min.css",
  minJs: webroot + "js/**/*.min.js"
};

gulp.task("clean:js", function(cb) {
  rimraf(paths.concatJsDest, cb);
});

gulp.task("clean:css", function(cb) {
  rimraf(paths.concatCssDest, cb);
});

gulp.task('clean:lib', function(cb) {
  rimraf(paths.lib, cb);
});

gulp.task("clean", ["clean:js", "clean:css"]);

gulp.task("min:js", function() {
  gulp.src([paths.js, "!" + paths.minJs], {
      base: "."
    })
    .pipe(concat(paths.concatJsDest))
    .pipe(uglify())
    .pipe(gulp.dest("."));
});

gulp.task("min:css", function() {
  gulp.src([paths.css, "!" + paths.minCss])
    .pipe(concat(paths.concatCssDest))
    .pipe(cssmin())
    .pipe(gulp.dest("."));
});

gulp.task("min", ["min:js", "min:css"]);

gulp.task('bower', ['clean:lib'], function() {
  return gulp.src('./bower.json')
    .pipe(mainBowerFiles())
    .pipe(gulp.dest(paths.lib));
});
