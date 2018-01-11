var gulp = require('gulp');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();
var sourcemaps = require('gulp-sourcemaps');
//--------------配置來源及出口
gulp.task('sass', function() {
    gulp.src('src/sass/*.sass')//檔案來源
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('public/css/'))//輸出位置
});
 
gulp.task('task_pug', function () {
    return gulp.src('src/pug/*.pug')
        .pipe(pug({ pretty: true }))
        .pipe(gulp.dest('public/'))
});

gulp.task('babel', function () {
    return gulp.src('src/babel/*.js')
        .pipe($.babel({ presets: ['es2015'] }))
        .pipe(gulp.dest('public/js/'));
});


//-------------靜態頁面html即時預覽
gulp.task('browser-sync', function () {
    browserSync.init({
        server: "public/"////指定啟動根目錄
    });
    gulp.watch('src/babel/*.js', ['babel']);
    gulp.watch(['public/js/*.js',]).on("change", browserSync.reload);
    gulp.watch('src/sass/*.sass', ['sass']);//監聽sass文件變化，執行sass編譯sass
    gulp.watch(['public/css/*.css',]).on("change", browserSync.reload);
    gulp.watch('src/pug/*.pug', ['task_pug']);   //監聽pug文件變化，執行task_pug編譯pug
    gulp.watch(['public/*.html',]).on("change", browserSync.reload);//監聽pug文件變化 重整瀏覽器
});
gulp.task('default', ['sass', 'task_pug', 'babel', 'browser-sync']); //定義默認任務（dafault） 命令 gulp default
