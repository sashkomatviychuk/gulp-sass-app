const gulpIf = require('gulp-if');
const sprity = require('sprity');
const debug = require('gulp-debug');
const notify = require('gulp-notify');
const config = require('../config');

module.exports = (gulp) => {

    return sprity.src(
        {
            src: config.spritesFiles,
            style: `_sprites.sass`,
            processor: 'sass',
            'style-type': 'sass',
        }
    )
        .pipe(
            gulpIf('*.png', gulp.dest(`${config.srcPath}images`), gulp.dest(`${config.srcPath}styles`))
        );
};
