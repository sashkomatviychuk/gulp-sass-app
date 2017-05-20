const path = require('path');
const del = require('del');
const remember = require('gulp-remember');

/**
 * On file unlink handler
 * @param {string} filepath
 * @param {object} options
 * @param {string} options.filepath
 * @param {boolean} [options.sass]
 * @return {void}
 */
const onUnlink = (filepath, options) => {
    const { appPath, sass } = options;
    const filePathFromSrc = path.relative(path.resolve(`${appPath}src`), filepath);
    const destFilePath = path.resolve(`${appPath}/public`, filePathFromSrc);

    if (sass) {
        remember.forget('styles', filepath.replace(/\.sass$/, '.css'));
    }

    del.sync(destFilePath);
};

/**
 * Watch task function
 * @param {object} gulp
 * @param {object} options
 */
module.exports = (gulp, options) => {
    const { appPath } = options;

    if (!appPath) throw new Error('Parameter "appPath" is required for sass task');

    gulp.watch(`${appPath}src/styles/**/*.sass`, gulp.series('sass'))
        .on('unlink', (filepath) => onUnlink(filepath, { appPath, sass: true }));

    gulp.watch([`${appPath}src/**/*.*`, `!${appPath}src/**/*.sass`], gulp.series('assets'))
        .on('unlink', (filepath) => onUnlink(filepath, { appPath }));
}
