var gulp   = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

gulp.task('lint', function () {
	return gulp.src([
		'./models/**/*.js', 
		'./controllers/**/*.js', 
		'./public/js/**/*.js', 
		'!./public/js/templates.js'
	])
	.pipe(jshint())
	.pipe(jshint.reporter(stylish));
});