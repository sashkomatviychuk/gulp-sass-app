const eslint = require('gulp-eslint');
const config = require('../config');
const combiner = require('stream-combiner2').obj;

module.exports = (gulp) => {
    
    return combiner(
        gulp.src(config.jsFiles),
        eslint(),
        eslint.format(),
        eslint.failAfterError()
    );
};
