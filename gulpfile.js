var gulp = require('gulp'),
	uglify=require("gulp-uglify"),
	concat=require('gulp-concat'),
	cssmin = require('gulp-minify-css'),
	autoprefixer = require('gulp-autoprefixer'),
	livereload = require('gulp-livereload'),
    sass = require('gulp-sass'),
    gulpSequence = require('gulp-sequence');


gulp.task('jsmin', function () { 
        gulp.src(['js/**/*.js'])
        .pipe(concat('my.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('js/'));  
});

 
gulp.task('sass', function () {
  return gulp.src('css/sass/main.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('css'));
});
 
// gulp.task('sass:watch', function () {
//   gulp.watch('./sass/**/*.scss', ['sass']);
// });

gulp.task('css', function () {
    gulp.src(['css/main.css'])
    .pipe(concat('main.min.css'))
    .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove:true //是否去掉不必要的前缀 默认：true 
        }))
    .pipe(cssmin())
    .pipe(gulp.dest('css/'))
	.pipe(livereload());//放在dest后面就表明对最后生成的my.min.css进行重载
});

//浏览器前缀自动补齐，更多请看他的文档
gulp.task('autoFx', function () {
    gulp.src(['public/stylesheets/bootstrap-theme.css','public/stylesheets/main.css','public/stylesheets/my_style.css'])
    	.pipe(concat('autopre.css'))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove:true //是否去掉不必要的前缀 默认：true 
        }))
        .pipe(gulp.dest('public/stylesheets/dist/'));
});

gulp.task('sequence', gulpSequence('sass', 'css'));

gulp.task("autowatch",function(){
	livereload.listen();
	gulp.watch(['css/sass/**/*.scss'],['sass']);	
	gulp.watch(['css/main.css'],['css']);
})


gulp.task('default', function() {
  // 将你的默认的任务代码放在这
});