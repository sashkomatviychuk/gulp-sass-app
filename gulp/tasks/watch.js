const path = require('path');
const del = require('del');
const remember = require('gulp-remember');
const config = require('../config');

/**
 * On file unlink handler
 * @param {string} filepath
 * @param {object} options
 * @param {string} options.filepath
 * @param {string} [options.type]
 * @return {void}
 */
const onUnlink = (filepath, options) => {
    const { type } = options;
    const filePathFromSrc = path.relative(path.resolve(config.srcPath), filepath);
    const destFilePath = path.resolve(config.publicPath, filePathFromSrc);

    if (type) {
        remember.forget(type, filepath.replace(/\.scss$/, '.css'));
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
        .on('unlink', filepath => onUnlink(filepath, { type: 'scss' }));

    // watch assets changes
    gulp.watch([config.assetsPath, `!${config.spritesFiles}`], gulp.series('assets'))
        .on('unlink', filepath => onUnlink(filepath));

    // watch sprite changes
    gulp.watch(config.spritesFiles, gulp.series('sprite'));

    // watch js changes
    gulp.watch(config.jsFiles, gulp.series('scripts'))
        .on('unlink', filepath => onUnlink(filepath, { type: 'scripts' }));
}
