const gulpIf = require('gulp-if');
const sprity = require('sprity');
const debug = require('gulp-debug');
const notify = require('gulp-notify');

module.exports = (gulp, options) => {
    const { appPath } = options;

    if (!appPath) throw new Error('Parameter "appPath" is required for sass task');

    return sprity.src(
        {
            src: `${appPath}src/images/sprite/*.png`,
            style: `_sprites.sass`,
            processor: 'sass',
            'style-type': 'sass',
        }
    )
        .pipe(
            gulpIf('*.png', gulp.dest(`${appPath}src/images`), gulp.dest(`${appPath}src/styles`))
        );
};
