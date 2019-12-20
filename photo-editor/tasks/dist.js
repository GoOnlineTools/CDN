const gulp = require('gulp');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const del = require('del');

const finalPath = './dist/final/';
const angularPath = './dist/angular/';

const scriptPaths = ['runtime', 'polyfills', 'main'].map(fileName => {
    return angularPath+fileName+'.*.js'
});

gulp.task('styles', () => {
    return gulp.src(angularPath+'styles.*.css')
        .pipe(rename('styles.min.css'))
        .pipe(gulp.dest(finalPath));
});

gulp.task('scripts', () => {
    return gulp.src(scriptPaths)
        .pipe(concat('scripts.min.js'))
        .pipe(gulp.dest(finalPath));
});

gulp.task('assets', () => {
    return gulp.src(angularPath+'assets/**/*')
        .pipe(gulp.dest(finalPath+'assets/'))
});

gulp.task('angularAssets', () => {
    return gulp.src([angularPath+'*.png', angularPath+'favicon.ico', angularPath+'3rdpartylicenses.txt'])
        .pipe(gulp.dest(finalPath+'assets/'))
});

gulp.task('clean', function () {
    return del([
        finalPath+'**/*/',
        '!'+finalPath+'/index.html',
    ]);
});

gulp.task('dist', gulp.series('clean', 'styles', 'scripts', 'assets', 'angularAssets'));