const path = require('path');
const del = require('del');

const onUnlink = (filepath, appPath) => {
    const filePathFromSrc = path.relative(path.resolve(`${appPath}src`), filepath);
    const destFilePath = path.resolve(`${appPath}/public`, filePathFromSrc);

    del.sync(destFilePath);
};

module.exports = (gulp, options) => {
    const { appPath } = options;

    if (!appPath) throw new Error('Parameter "appPath" is required for sass task');

    gulp.watch(`${appPath}src/styles/**/*.sass`, gulp.series('sass'))
        .on('unlink', (filepath) => onUnlink(filepath, appPath));

    gulp.watch([`${appPath}src/**/*.*`, `!${appPath}src/**/*.sass`], gulp.series('assets'))
        .on('unlink', (filepath) => onUnlink(filepath, appPath));
}
