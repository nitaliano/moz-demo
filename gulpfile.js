var gulp   = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

var dirs = [
  './models/**/*.js', 
  './controllers/**/*.js', 
  './public/js/**/*.js', 
  '!./public/js/templates.js'
];

gulp.task('lint', function () {
  return gulp.src(dirs)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});