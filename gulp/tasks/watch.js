const path = require('path');
const del = require('del');
const remember = require('gulp-remember');
const config = require('../config');

/**
 * On file unlink handler
 * @param {string} filepath
 * @param {object} options
 * @param {string} options.filepath
 * @param {boolean} [options.scss]
 * @return {void}
 */
const onUnlink = (filepath, options) => {
    const { scss } = options;
    const filePathFromSrc = path.relative(path.resolve(config.srcPath), filepath);
    const destFilePath = path.resolve(config.publicPath, filePathFromSrc);

    if (scss) {
        remember.forget('styles', filepath.replace(/\.scss$/, '.css'));
    }

    del.sync(destFilePath);
};

/**
 * Watch task function
 * @param {object} gulp
 */
module.exports = gulp => {
    // watch scss changes
    gulp.watch(config.scssFiles, gulp.series('scss'))
        .on('unlink', filepath => onUnlink(filepath, { scss: true }));

    // watch assets changes
    gulp.watch([config.assetsPath, `!${config.spritesFiles}`], gulp.series('assets'))
        .on('unlink', filepath => onUnlink(filepath));

    // watch sprite changes
    gulp.watch(config.spritesFiles, gulp.series('sprite'));

    // @todo: add watch js files
}
