const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const rename = require('gulp-rename');

function swallowError(error) {
  console.error(error.toString());
  this.emit('end')
}

gulp.task('default', ['sass'], function () {
  browserSync.init({
    notify: false,
    proxy: "localhost:9000"
  });
  gulp.watch("main/static/css/*.scss", ['sass'])
});

gulp.task('sass', function () {
  return gulp.src("main/static/css/*.scss")
    .pipe(sass()).on('error', swallowError)
    .pipe(rename({suffix: '.compiled'}))
    .pipe(gulp.dest("static/CACHE/css"))
    .pipe(browserSync.stream())
});