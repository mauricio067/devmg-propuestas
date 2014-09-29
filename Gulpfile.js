var gulp = require('gulp'),
connect = require('gulp-connect'),
historyApiFallback = require('connect-history-api-fallback');

var stylus = require('gulp-stylus'),
nib = require('nib');

// Preprocesa archivos Stylus a CSS y recarga los cambios
gulp.task('css', function() {
	gulp.src('./public/stylus/main.styl')
	.pipe(stylus({ use: nib() }))
	.pipe(gulp.dest('./public/css'))
	.pipe(connect.reload());
});
// Recarga el navegador cuando hay cambios en el HTML
gulp.task('html', function() {
	gulp.src('./public/**/*.html')
	.pipe(connect.reload());
});
// Vigila cambios que se produzcan en el código
// y lanza las tareas relacionadas
gulp.task('watch', function() {
	gulp.watch(['./public/**/*.html'], ['html']);
	gulp.watch(['./public/stylus/**/*.styl'], ['css']);
});
// Servidor web de desarrollo

gulp.task('server', function() {
	connect.server({
		root: './public',
		hostname: '0.0.0.0',
		port: 8000,
		livereload: true,
		middleware: function(connect, opt) {
			return [ historyApiFallback ];
		}
	});
});
gulp.task('default', ['server', 'watch']);