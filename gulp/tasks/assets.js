const debug = require('gulp-debug');
const notify = require('gulp-notify');
const replace = require('gulp-rev-replace');
const gulpIf = require('gulp-if');
const combiner = require('stream-combiner2').obj;

const config = require('../config');

const onError = err => ({
    title: 'Assets build error',
    message: err.message,
});

module.exports = (gulp, options) => {
    const { isDev } = options;

    return combiner(
        gulp.src(config.assetsPath, { since: gulp.lastRun('assets') }),
        debug({title: 'assets'}),
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
