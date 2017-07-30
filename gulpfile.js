/**
 * Created by chenshuangs on 2016/12/16.
 */
/*
*gulp.src: 来源
 gulp.dest: 目标
 gulp.pipe: 管道
 gulp.watch: 监视文件系统，文件改动时自动处理
 gulp.task: 任务
* */

// var watchify = require("watchify"),
//     browserify = require('browserify'),
var gulp = require('gulp'),////本地安装gulp所用到的地方
    less = require('gulp-less'),//将less预处理为css
    sourcemaps = require('gulp-sourcemaps'),//处理JS时，生成SourceMap
    minifycss = require('gulp-clean-css'),//压缩css
    concat  = require('gulp-concat'),//合并
    uglify  = require('gulp-uglify'),//通过UglifyJS来压缩JS文件
    tmodjs = require('gulp-tmod'),//
    autoprefixer = require('gulp-autoprefixer'),//自动添加CSS3浏览器前缀
    rename = require("gulp-rename"),//命名
    combiner = require('stream-combiner2');//错误处理

gulp.task('default', function(){
    var stream = gulp.src('template/**/*.html')
        .pipe(tmodjs({
            templateBase: 'template'
        }))
        .pipe(gulp.dest('dist'));
    return stream;
});

gulp.task('mainJs', function() {
    var combined =combiner.obj([
        gulp.src('src/assets/script/js/*.js'),
        uglify(),
        rename({suffix:'.min'}),
        // concat("main.min.js"),
        gulp.dest('src/assets/script/js/min')
    ]);
    combined.on('error',console.error.bind(console));
    return combined;

});
gulp.task('Js', function() {
    var combined =combiner.obj([
        gulp.src('editor/kindeditor.js'),
        uglify(),
        rename({suffix:'.a.min'}),
        // concat("main.min.js"),
        gulp.dest('editor/')
    ]);
    combined.on('error',console.error.bind(console));
    return combined;

});
gulp.task('mainLess', function () {
    gulp.src('src/assets/style/less/main.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write())
        .pipe(minifycss())
        .pipe(concat('main.min.css'))//合并后的文件名main.min.css
        .pipe(gulp.dest('src/assets/style/css'))
});


//任务监听
gulp.task('watch', function () {
    gulp.watch(['src/assets/style/less/main.less',
        'src/assets/style/less/login.less',
        'src/assets/style/less/page-index.less',
        'src/assets/style/less/page-class.less',
        'src/assets/style/less/page-ask.less',
        'src/assets/style/less/page-note.less',
        'src/assets/style/less/page-success.less',
        'src/assets/style/less/page-personal.less',
    ],['mainLess']);
});

//less任务
//gulp.task('less', ['mainLess']);
//js任务
gulp.task('js', ['mainJs']);
//缺省任务
gulp.task('default', ['watch','mainJs',]);
