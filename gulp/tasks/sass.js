const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const gulpIf = require('gulp-if');
const debug = require('gulp-debug');

module.exports = (gulp, options) => {
    const { appPath, isDev } = options;

    if (!appPath) throw new Error('Parameter "appPath" is required for sass task');

    return gulp.src(`${appPath}src/styles/**/*.sass`)
        .pipe(gulpIf(isDev, sourcemaps.init()))
        .pipe(debug({title: 'sass'}))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulpIf(isDev, sourcemaps.write()))
        .pipe(gulp.dest(`${appPath}public/css`));
};
