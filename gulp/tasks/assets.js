const debug = require('gulp-debug');

module.exports = (gulp, options) => {
    const { appPath } = options;

    if (!appPath) throw new Error('Parameter "appPath" is required for sass task');

    return gulp.src(`${appPath}src/**/*.{html,svg,png,ico}`, { since: gulp.lastRun('assets') })
        .pipe(debug({title: 'assets'}))
        .pipe(gulp.dest(`${appPath}public`));
};
