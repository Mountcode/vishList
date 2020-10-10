var gulp        = require('gulp'),
    less        = require('gulp-less'),
    browserSync = require('browser-sync'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglifyjs'),
    cssnano     = require('gulp-cssnano'),
    rename      = require('gulp-rename');

//Компилятор less
gulp.task('less', function(){
    return gulp.src('app/less/*.less')
    .pipe(less())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('cssLibs', function() {
    return gulp.src(['app/libs/fancybox/dist/jquery.fancybox.css',
                     'app/libs/owl.carousel/dist/assets/owl.carousel.min.css',
                      
        ])  
        .pipe(cssnano())
        .pipe(concat('libs.min.css'))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('minifyCss', function() {
    return gulp.src(['app/css/libs.min.css',
                     'app/fonts/fontawesome/css/font-awesome.min.css',
                     'app/css/responsive.css' 
        ])  
        .pipe(cssnano())
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}))
});
 
//Собираем скрипты, объединяем.
gulp.task('scripts', function(){
    return gulp.src([
        'app/libs/jquery/dist/jquery.min.js',
        'app/libs/fancybox/dist/jquery.fancybox.min.js',
        'app/libs/owl.carousel/dist/owl.carousel.min.js',
        'app/libs/jquery.mask/dist/jquery.mask.js',
        'app/libs/lazyload/lazyload.js'
    ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'));
})

//Лив превью
gulp.task('browser-sync', function() {
    browserSync.init({
		server:{
			baseDir:'app'
		},
		notify: false
	});
});

gulp.task('code', function(){
    return gulp.src('app/*.html')
    .pipe(browserSync.reload({stream: true}))
})

//Следим за изменениями файлов и запускаем таски


gulp.task('watch', function() {
    gulp.watch('app/less/*.less', gulp.parallel('less'));
    gulp.watch(['app/css/style.css', 'app/css/responsive.css'], gulp.parallel('minifyCss'));
    gulp.watch('app/js/**/*.js', browserSync.reload);
    gulp.watch('app/*.html', gulp.parallel('code'));
}); 


gulp.task('def', gulp.parallel('watch','browser-sync', 'less', 'minifyCss'));






