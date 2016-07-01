var	gulp = require('gulp'),
	less = require('gulp-less'),
    rename = require('gulp-rename'),
	watch = require('gulp-watch');


// Répertoires
var app = 'www/dev-mediabong_fichiers',
	dist = 'www/dev-mediabong_fichiers';

	

// COMPILATION DE MINIFICATION DU LESS
gulp.task('less', function() {	
	gulp.src(app + '/mediabong.less')
		.pipe(less())
		// .pipe(rename('mediabong-test.css'))
		.pipe(gulp.dest(dist));
});	



gulp.task('default', function() {
	
	gulp.start('less');

	watch(app + '/*.less', function($event) {
		gulp.start('less');
	});
}); 