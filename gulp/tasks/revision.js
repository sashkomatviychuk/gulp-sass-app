const revCollector = require('gulp-rev-collector');
const config = require('../config');

module.exports = gulp => {
    return gulp.src([
        `${config.manifestPath}/*.json`,
        `${config.publicPath}/*.html`,
    ])
    .pipe(revCollector())
    .pipe(gulp.dest(config.publicPath))
};