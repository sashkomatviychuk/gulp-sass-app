const spritesmith = require('gulp.spritesmith');
const buffer = require('vinyl-buffer');
const imagemin = require('gulp-imagemin');
const merge = require('merge-stream');

const config = require('../config');

module.exports = gulp => {    
    const spriteData = gulp.src(config.spritesFiles).pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: '_sprite.scss'
    }));

    const imgStream = spriteData.img
        .pipe(buffer())
        .pipe(imagemin())
        .pipe(gulp.dest(`${config.srcPath}/images`));

    const cssStream = spriteData.css
        .pipe(gulp.dest(`${config.srcPath}/scss`));

    return merge(imgStream, cssStream);
};
