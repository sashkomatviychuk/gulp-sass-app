const sourcemaps = require('gulp-sourcemaps');
const gulpIf = require('gulp-if');
const debug = require('gulp-debug');
const notify = require('gulp-notify');
const concat = require('gulp-concat');
const remember = require('gulp-remember');
const rev = require('gulp-rev');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const combiner = require('stream-combiner2').obj;

const config = require('../config');

module.exports = gulp => {
    const isDev = !process.env.NODE_ENV || process.env.NODE_ENV !== 'production';

    return combiner(
        gulp.src(config.jsFiles, { since: gulp.lastRun('scripts') }),
        gulpIf(isDev, sourcemaps.init()),
        debug({title: 'scripts'}),
        babel({
            presets: ['@babel/env']
        }),
        gulpIf(isDev, sourcemaps.write()),
        remember('scripts'),
        concat('app.js'),
        gulpIf(!isDev, combiner(
            uglify(),
            rev()
        )),
        gulp.dest(`${config.publicPath}/js`),
        gulpIf(!isDev, combiner(
            rev.manifest(`${config.manifestPath}/rev-manifest.json`, {
                base: config.manifestPath,
                merge: true,
            }),
            gulp.dest(config.manifestPath)
        )),
        notify({
            message: 'Compiled successfuly',
            title: 'scripts'
        })
    ).on('error', notify.onError(err => ({
        title: 'JavaScript compilation error',
        message: err.message,
    })));
};