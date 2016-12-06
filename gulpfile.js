var gulp = require('gulp');
var ugly = require('gulp-uglify');
var ts = require('gulp-typescript');
var merge = require('merge2');

var tSrc = 'src/**/*.ts';
var dest = 'release/';
var tSrc2 = 'demo/ts/demo.ts';
var dest2 = 'demo/Script';

gulp.task('ts2js2',function(){
    var tsResult = gulp.src(tSrc2)
    .pipe(ts({
        declaration:true,
        out:'demo.m.js'
    }));

    return merge([
        tsResult.js.pipe(ugly()),        
        tsResult.js.pipe(gulp.dest(dest2))
    ])
})


gulp.task('ts2js',function(){
    var tsResult = gulp.src(tSrc)
    .pipe(ts({
        declaration:true,
        out:'river.m.js'
    }));

    return merge([
        tsResult.dts.pipe(gulp.dest(dest + 'def')),
        tsResult.js.pipe(ugly()),        
        tsResult.js.pipe(gulp.dest(dest + 'js'))
    ])
})

gulp.task('watch',['ts2js'],function(){
    gulp.watch(tSrc,['ts2js'])
})