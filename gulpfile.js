var gulp    = require('gulp'),
    util    = require('gulp-util'),
    jade    = require('gulp-jade'),
    del     = require('del'),
    webpack = require('webpack'),
    server  = require('webpack-dev-server'),
    config  = require('./webpack.js'),
    pages   = require('./package.json').pages;

gulp.task('clean', function() {
    del([ './public' ]);
    del([ './tmp' ]);
});

gulp.task('jade', function() {
    return gulp.src('./src/index.jade')
        .pipe(jade(pages.index))
        .pipe(gulp.dest('./public'));
});

gulp.task('static', function() {
    return gulp.src('./src/favicon.ico')
        .pipe(gulp.dest('./public'));
});

gulp.task('build', ['clean', 'static', 'jade'], function() {
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        output: { comments: false },
        compress: { warnings: false }
    }));
    config.devtool = 'source-map';
    webpack(config, function(err, stats) {
        if(err) throw new util.PluginError('webpack', err);
        util.log('[webpack]', stats.toString({
            watch: true,
            colors: true,
            progress: true
        }));
    });
});

gulp.task('serve', ['clean', 'static', 'jade'], function() {
    return new server(webpack(config), {
        contentBase: __dirname + '/public',
        hot: true
    }).listen(8080, 'localhost', function(err) {
        if (err) throw new util.PluginError('webpack-dev-server', err);
        util.log('[server]', 'http://localhost:8080/');
    });
});

gulp.task('default', ['serve'], function() {
    console.log('Gulp and running!');
});
