const gulpIf = require('gulp-if');
const sprity = require('sprity');
const config = require('../config');

module.exports = gulp => {
    return sprity.src(
        {
            src: config.spritesFiles,
            style: `_sprites.scss`,
            processor: 'scss',
            'style-type': 'scss',
        }
    )
        .pipe(
            gulpIf('*.png', gulp.dest(`${config.srcPath}images`), gulp.dest(`${config.srcPath}styles`))
        );
};
