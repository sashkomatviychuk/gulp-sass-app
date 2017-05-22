const browserSync = require('browser-sync').create();
const config = require('../config');

module.exports = (gulp) => {
    browserSync.init({
        server: {
            baseDir: config.publicPath,
        },
    });

    browserSync.watch(`${config.publicPath}/**/*.*`)
        .on('change', browserSync.reload);
}
