var gulp      = require('gulp'),
  clean       = require('del'),
  jade        = require('gulp-jade'),
  browserify  = require('gulp-browserify'),
  uglify      = require('gulp-uglify'),
  jshint      = require('gulp-jshint'),
  sass        = require('gulp-sass'),
  minify      = require('gulp-minify-css'),
  rename      = require('gulp-rename'),
  browser     = require('browser-sync').create();

gulp.task('clean', function () {
  clean([ './public' ]);
  clean([ './tmp' ]);
});

gulp.task('jade', function () {
  return gulp.src('./src/index.jade')
    .pipe(jade({ data: { title: 'Gulp Boilerplate' } }))
    .pipe(gulp.dest('./public'))
    .pipe(browser.stream());
});

gulp.task('es6', function () {
  return gulp.src('./src/app.js')
    .pipe(browserify({
      extensions: [ '.js' ],
      transform: [ 'babelify' ],
      debug: true
    }))
    .pipe(jshint())
    .pipe(gulp.dest('./tmp'))
    .pipe(rename({suffix: '.min', extname: '.js'}))
    .pipe(uglify())
    .pipe(gulp.dest('./public/js'))
    .pipe(browser.stream());
});

gulp.task('sass', function () {
  return gulp.src('./src/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./tmp'))
    .pipe(rename({suffix: '.min', extname: '.css'}))
    .pipe(minify({keepSpecialComments: 0}))
    .pipe(gulp.dest('./public/css'))
    .pipe(browser.stream());
});

gulp.task('static', function () {
  return gulp.src('./node_modules/bootstrap-sass/assets/fonts/bootstrap/*.*')
    .pipe(gulp.dest('./public/fonts'));
});

gulp.task('build', ['clean', 'static', 'jade', 'es6', 'sass']);

gulp.task('watch', ['build'], function () {
  gulp.watch('./src/index.jade', ['jade']);
  gulp.watch([ './src/**/*.js' ], ['es6']);
  gulp.watch('./src/*.scss', ['sass']);
});

gulp.task('serve', ['watch'], function () {
  browser.init({
    server: './public',
    logFileChanges: false,
    reloadOnRestart: true
  });
});

gulp.task('default', ['serve'], function () {
  console.log('Gulp and running!');
});
