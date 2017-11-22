
var gulp = require('gulp'); // 將 node_modules 的檔案載入
var sass = require('gulp-sass');
var path = {
    source: './source/',
    public: './public/'
    }
var browserSync = require('browser-sync').create();    
var sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', function() {  // 定義 sass 的任務名稱
    return gulp.src('./source/scss/**/*.scss') // sass 的來源資料夾        
        .pipe(sourcemaps.init())
        
        .pipe(sass(                     // 編譯 sass
            {outputStyle: 'compact'} // sass 的輸出格式
        ).on('error', sass.logError))
        .pipe(sourcemaps.write('./', {includeContent: false, sourceRoot: '../source/scss'}))
        // 輸出CSS
        .pipe(gulp.dest('./public/css') // sass 編譯完成後的匯出資料夾
)});

//靜態頁面html即時預覽
gulp.task('browser-sync', function() {
    browserSync.init({
        server: "public/" //指定啟動根目錄
    });
    gulp.watch(['public/**/*.html',]).on("change",browserSync.reload);//監聽文件變化 重整瀏覽器
    gulp.watch(['public/**/*.css',]).on("change",browserSync.reload);
});

gulp.task('default', ['sass','browser-sync'], function() {
    gulp.watch('./source/scss/**/*.scss', ['sass']);
    // gulp.watch('./public/**/*.html', ['browser-sync']);  
    // gulp.watch('./public/**/*.css', ['browser-sync']);  
    // 監控資料夾，當scss有變化時執行 'sass' 任務
    // 監控資料夾，當html或css有變化時執行 browser-sync' 任務
})



