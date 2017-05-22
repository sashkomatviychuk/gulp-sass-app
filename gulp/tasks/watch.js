const path = require('path');
const del = require('del');
const remember = require('gulp-remember');
const config = require('../config');

/**
 * On file unlink handler
 * @param {string} filepath
 * @param {object} options
 * @param {string} options.filepath
 * @param {boolean} [options.sass]
 * @return {void}
 */
const onUnlink = (filepath, options) => {
    const { sass } = options;
    const filePathFromSrc = path.relative(path.resolve(config.srcPath), filepath);
    const destFilePath = path.resolve(config.publicPath, filePathFromSrc);

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
module.exports = (gulp) => {
    // watch sass changes
    gulp.watch(config.sassFiles, gulp.series('sass'))
        .on('unlink', (filepath) => onUnlink(filepath, { sass: true }));

    // watch assets changes
    gulp.watch([config.assetsPath, `!${config.spritesFiles}`], gulp.series('assets'))
        .on('unlink', (filepath) => onUnlink(filepath));

    // watch sprite changes
    gulp.watch(config.spritesFiles, gulp.series('sprite'));
}
