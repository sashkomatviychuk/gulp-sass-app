const debug = require('gulp-debug');
const notify = require('gulp-notify');
const combiner = require('stream-combiner2').obj;

const onError = err => ({
    title: 'Assets build error',
    message: err.message,
});

module.exports = (gulp, options) => {
    const { appPath } = options;

    if (!appPath) throw new Error('Parameter "appPath" is required for sass task');

    return combiner(
        gulp.src(`${appPath}src/**/*.{html,svg,png,ico}`, { since: gulp.lastRun('assets') }),
        debug({title: 'assets'}),
        gulp.dest(`${appPath}public`)
    )
        .on('error', notify.onError(onError));
};
