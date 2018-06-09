const gulp = require('gulp');
const nunjucks = require('gulp-nunjucks-render');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const plumber = require('gulp-plumber');

gulp.task('scss', () => {
  return gulp.src('src/main.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('dist/css/'))
    .pipe(browserSync.stream())
});

gulp.task('html', () => {
  return gulp.src('src/views/*.html')
    .pipe(nunjucks({
      path: 'src/',
    }))
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.stream())
});

gulp.task('reload', () => {
  browserSync({
    server: {
      baseDir: 'dist/'
    },
    notify: false,
  });
});

gulp.task('watch', ['reload', 'scss', 'html'], () => {
  gulp.watch('src/**/*.scss', ['scss']);
  gulp.watch(['src/**/*.html', 'src/components/**/*.html'], ['html'])
  gulp.watch('dist/*.html', browserSync.reload)
});