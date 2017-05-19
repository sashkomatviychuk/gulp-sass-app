const browserSync = require('browser-sync').create();

module.exports = (gulp, options) => {
    const { appPath } = options;

    if (!appPath) throw new Error('Parameter "appPath" is required for sass task');

    browserSync.init({
        server: {
            baseDir: `${appPath}public`,
        },
    });

    browserSync.watch(`${appPath}public/**/*.*`)
        .on('change', browserSync.reload);
}
