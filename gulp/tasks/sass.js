const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const gulpIf = require('gulp-if');
const debug = require('gulp-debug');
const notify = require('gulp-notify');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const uglifycss = require('gulp-uglifycss');
const remember = require('gulp-remember');
const rev = require('gulp-rev');
const combiner = require('stream-combiner2').obj;

const config = require('../config');

/**
 * On error handler
 * @param {Error} err
 * @return {object}
 */
const onError = err => ({
    title: 'Scss compilation error',
    message: err.message,
});

/**
 * Scss task function
 * @param {object} gulp
 */
module.exports = gulp => {
    const isDev = !process.env.NODE_ENV || process.env.NODE_ENV !== 'production';

    return combiner(
        gulp.src(config.scssFiles, { since: gulp.lastRun('scss') }),
        gulpIf(isDev, sourcemaps.init()),
        debug({title: 'scss'}),
        sass(),
        gulpIf(isDev, sourcemaps.write()),
        autoprefixer(),
        remember('styles'),
        concat('styles.css'),
        gulpIf(!isDev, combiner(
            uglifycss({
                uglyComments: true,
            }),
            rev()
        )),
        gulp.dest(`${config.publicPath}/css`),
        gulpIf(!isDev, combiner(
            rev.manifest('css.json'),
            gulp.dest(config.manifestPath)
        )),
        notify({
            message: 'Compiled successfuly',
            title: 'Scss'
        })
    )
        .on('error', notify.onError(onError));
};
