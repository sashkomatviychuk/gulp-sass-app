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

/**
 * On error handler
 * @param {Error} err
 * @return {object}
 */
const onError = err => ({
    title: 'Sass compilation error',
    message: err.message,
});

/**
 * Sass task function
 * @param {object} gulp
 * @param {object} options
 */
module.exports = (gulp, options) => {
    const { appPath, isDev } = options;

    if (!appPath) throw new Error('Parameter "appPath" is required for sass task');

    return combiner(
        gulp.src(`${appPath}src/styles/**/*.sass`, { since: gulp.lastRun('sass') }),
        gulpIf(isDev, sourcemaps.init()),
        debug({title: 'sass'}),
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
        gulp.dest(`${appPath}public/css`),
        gulpIf(!isDev, combiner(
            rev.manifest('css.json'),
            gulp.dest(`${appPath}manifest`)
        )),
        notify({
            message: 'Compiled successfuly',
            title: 'Sass'
        })
    )
        .on('error', notify.onError(onError));
};
