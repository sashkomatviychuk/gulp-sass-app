const debug = require('gulp-debug');
const notify = require('gulp-notify');
const replace = require('gulp-rev-replace');
const gulpIf = require('gulp-if');
const image = require('gulp-image');
const combiner = require('stream-combiner2').obj;

const config = require('../config');

const onError = err => ({
    title: 'Assets build error',
    message: err.message,
});

module.exports = gulp => {
    const isDev = !process.env.NODE_ENV || process.env.NODE_ENV !== 'production';

    return combiner(
        gulp.src(
            [
                config.assetsPath,
                `!${config.scssFiles}`,
                `!${config.spritesFiles}`,
                `!${config.jsFiles}`,
            ],
            { since: gulp.lastRun('assets') }
        ),
        debug({title: 'assets'}),
        gulpIf(
            !isDev,
            gulpIf('*.{png,jpg,gif,svg}', image())
        ),
        gulpIf(
            !isDev,
            replace({
                manifest: gulp.src(
                    `${config.manifestPath}/css.json`,
                    { allowEmpty: true }
                ),
            })
        ),
        gulp.dest(config.publicPath)
    )
        .on('error', notify.onError(onError));
};
