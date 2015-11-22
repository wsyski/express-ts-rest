var gulp = require('gulp');
var path = require('path');
var mocha = require('gulp-mocha');
var nodemon = require('gulp-nodemon');
var cp = require('child_process');
var tsb = require('gulp-tsb');

// run mocha tests in the ./tests folder
gulp.task('test', function () {

    return gulp.src('./tests/test*.js', { read: false })
    // gulp-mocha needs filepaths so you can't have any plugins before it 
        .pipe(mocha());
});

// run nodemon on server file changes
gulp.task('nodemon', function (cb) {
    var started = false;

    return nodemon({
        script: 'src/www.js',
        watch: ['src/*.js']
    }).on('start', function () {
        if (!started) {
            cb();
            started = true;
        }
    });
});

// TypeScript build for /src folder, pipes in .d.ts files from typings folder 
var tsConfigSrc = tsb.create('src/tsconfig.json');
gulp.task('build', function () {
    return gulp.src(['typings/**/*.ts', 'src/**/*.ts'])
        .pipe(tsConfigSrc()) 
        .pipe(gulp.dest('src'));
});

// TypeScript build for /tests folder, pipes in .d.ts files from typings folder
// as well as the src/tsd.d.ts which is referenced by tests/tsd.d.ts 
var tsConfigTests = tsb.create('tests/tsconfig.json');
gulp.task('buildTests', function () {
    // pipe in all necessary files
    return gulp.src(['typings/**/*.ts', 'tests/**/*.ts', 'src/tsd.d.ts'])
        .pipe(tsConfigTests()) 
        .pipe(gulp.dest('tests'));
});

// watch for any TypeScript file changes
// if a file change is detected, run the TypeScript compile gulp tasks
gulp.task('watch', function () {
    gulp.watch('src/**/*.ts', ['build']);
    gulp.watch('tests/**/*.ts', ['buildTests']);
}); 

gulp.task('buildAll', ['build', 'buildTests']);
gulp.task('default', ['nodemon', 'watch']);
