const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const gulpIf = require('gulp-if');
const debug = require('gulp-debug');
const notify = require('gulp-notify');
const combiner = require('stream-combiner2').obj;

const onError = err => ({
    title: 'Sass compilation error',
    message: err.message,
});

module.exports = (gulp, options) => {
    const { appPath, isDev } = options;

    if (!appPath) throw new Error('Parameter "appPath" is required for sass task');

    return combiner(
        gulp.src(`${appPath}src/styles/**/*.sass`),
        gulpIf(isDev, sourcemaps.init()),
        debug({title: 'sass'}),
        sass(),
        gulpIf(isDev, sourcemaps.write()),
        gulp.dest(`${appPath}public/css`),
        notify({
            message: 'Compiled successfuly',
            title: 'Sass'
        })
    )
        .on('error', notify.onError(onError));
};
