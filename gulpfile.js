const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const concat = require('gulp-concat');

const outputDir = 'build';

function swallowError(error) {
    console.error(error.toString());
    this.emit('end')
}

gulp.task('default', ['sass', 'es6', 'static'], function () {
    browserSync.init({
        server: {
            baseDir: outputDir
        },
        notify: false,
    });
    gulp.watch("src/css/*.scss", ['sass'])
    gulp.watch("src/js/*", ['es6'])
    gulp.watch(['src/index.html', 'src/img'], ['static'])
});

gulp.task('sass', function () {
    return gulp.src('src/css/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass()).on('error', swallowError)
        .pipe(concat('all.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(outputDir))
        .pipe(browserSync.stream())
});

gulp.task('es6', () => {
    return gulp.src('src/js/*')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('all.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(outputDir))
})

gulp.task('static', () => {
    return gulp.src(['src/index.html', 'src/img'])
        .pipe(gulp.dest(outputDir))
})
