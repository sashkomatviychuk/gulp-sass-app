const debug = require('gulp-debug');
const notify = require('gulp-notify');
const replace = require('gulp-rev-replace');
const gulpIf = require('gulp-if');
const combiner = require('stream-combiner2').obj;

const onError = err => ({
    title: 'Assets build error',
    message: err.message,
});

module.exports = (gulp, options) => {
    const { appPath, isDev } = options;

    if (!appPath) throw new Error('Parameter "appPath" is required for sass task');

    return combiner(
        gulp.src(`${appPath}src/**/*.{html,svg,png,ico}`, { since: gulp.lastRun('assets') }),
        debug({title: 'assets'}),
        gulpIf(
            !isDev,
            replace({
                manifest: gulp.src(`${appPath}manifest/css.json`, { allowEmpty: true }),
            })
        ),
        gulp.dest(`${appPath}public`)
    )
        .on('error', notify.onError(onError));
};
