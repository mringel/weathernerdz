var gulp = require('gulp');
var mocha = require('gulp-mocha');
var sass = require('gulp-sass');
var maps = require('gulp-sourcemaps');
var testFiles = ['./test/**/*.js'];
var webpack = require('webpack-stream');

gulp.task('static:dev', function() {
  gulp.src('app/**/*.html')
  .pipe(gulp.dest('build/'));
});

gulp.task('images:dev', function() {
  gulp.src('app/images/leaflet/*.png')
  .pipe(gulp.dest('build/images/leaflet/'));
});

gulp.task('webpack:dev', function() {
  return gulp.src('app/js/entry.js')
  .pipe(webpack({
    output: {
      filename: 'bundle.js'
    }
  }))
  .pipe(gulp.dest('build/'));
});

gulp.task('styles:dev', function() {
  return gulp.src(['app/styles/**/*.scss'])
    .pipe(maps.init())
    .pipe(sass().on('error', sass.logError))
    // .pipe(minifyCss())
    .pipe(maps.write('./'))
  .pipe(gulp.dest('build/styles/'));
});

gulp.task('webpack:test', function() {
  return gulp.src('test/client/test_entry.js')
  .pipe(webpack ({
    output: {
      filename: 'test_bundle.js'
    }
  }))
  .pipe(gulp.dest('test/client/'));
});

gulp.task('build:dev', ['webpack:dev', 'styles:dev', 'images:dev', 'static:dev']);
gulp.task('default', ['build:dev']);
