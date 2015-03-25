var gulp   = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var soften = require('gulp-soften');

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
 
gulp.task('soften', function () {
  gulp.src(dirs)
    .pipe(soften(2))
    .pipe(gulp.dest('./'));
})