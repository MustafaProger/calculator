const gulp         = require('gulp');
const browserSync  = require('browser-sync').create();
const htmlmin      = require('gulp-htmlmin');

gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "dist"
        }
    });
});

gulp.task('html', function(){
    return gulp.src('src/*.html') 
    .pipe(htmlmin({ collapseWhitespace: true })) 
    .pipe(gulp.dest('dist/'));
});

gulp.task('styles', function(){
    return gulp.src('src/css/*.css') 
    .pipe(gulp.dest('dist/css'));
});

gulp.task('scripts', function(){
    return gulp.src('src/js/*.js') 
    .pipe(gulp.dest('dist/js'));
});

gulp.task('watch', function(){
    gulp.watch('src/*.html').on('change', browserSync.reload)
    gulp.watch('src/js/*.js', gulp.parallel('scripts'))
    gulp.watch('src/css/*.css',gulp.parallel('styles'))
    gulp.watch('src/*.html', gulp.parallel('html'))
});


gulp.task('default', gulp.parallel('watch', 'server', 'html', 'styles', 'scripts'));

