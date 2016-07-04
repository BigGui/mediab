var	gulp = require('gulp'),
	less = require('gulp-less'),
    rename = require('gulp-rename'),
	watch = require('gulp-watch');


// Répertoires
var app = 'app',
	dist = 'www/assets';


// COMPILATION DE MINIFICATION DU LESS
gulp.task('less', function() {	
	gulp.src(app + '/less/mediabong.less')
		.pipe(less())
		// .pipe(rename('mediabong-test.css'))
		.pipe(gulp.dest(dist + '/css'));
});	



gulp.task('default', function() {
	
	gulp.start('less');

	watch(app + '/less/**/*.less', function($event) {
		gulp.start('less');
	});
}); 