var gulp      = require('gulp'),
  clean       = require('del'),
  jade        = require('gulp-jade'),
  browserify  = require('browserify'),
  babelify    = require('babelify'),
  uglify      = require('gulp-uglify'),
  rename      = require('gulp-rename'),
  stream      = require('vinyl-source-stream'),
  buffer      = require('vinyl-buffer'),
  utils       = require('gulp-util'),
  sourcemaps  = require('gulp-sourcemaps'),
  sass        = require('gulp-sass'),
  minify      = require('gulp-minify-css'),
  browser     = require('browser-sync').create();

gulp.task('clean', function () {
  clean([ './public' ]);
  clean([ './tmp' ]);
});

gulp.task('jade', function () {
  gulp.src('./src/index.jade')
    .pipe(jade({ data: { title: 'Posts' } }))
    .pipe(gulp.dest('./public'))
    .pipe(browser.stream({ once: true }));

  gulp.src('./src/views/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('./public/views'))
    .pipe(browser.stream({ once: true }));
});

gulp.task('es6', function () {
  return browserify({
      entries: './src/app.js',
      transform: [ babelify ],
      debug: true
    })
    .bundle()
    .pipe(stream('app.min.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .on('error', utils.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./public/js'))
    .pipe(browser.stream({ once: true }));
});

gulp.task('sass', function () {
  return gulp.src('./src/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./tmp'))
    .pipe(rename({suffix: '.min', extname: '.css'}))
    .pipe(minify({keepSpecialComments: 0}))
    .pipe(gulp.dest('./public/css'))
    .pipe(browser.stream({ once: true }));
});

gulp.task('static', function () {
  return gulp.src('./node_modules/bootstrap-sass/assets/fonts/bootstrap/*.*')
    .pipe(gulp.dest('./public/fonts'));
});

gulp.task('build', ['clean', 'static', 'jade', 'es6', 'sass']);

gulp.task('watch', ['build'], function () {
  gulp.watch([ './src/**/*.jade' ], ['jade']);
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
