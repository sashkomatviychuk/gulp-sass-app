const gulp = require('gulp');
const del = require('del');

// load data from config
const { publicPath } = require('./config');
const isDev = !process.env.NODE_ENV || process.env.NODE_ENV !== 'production';

// require gulp tasks
const scssTask = require('./tasks/scss');
const assetsTask = require('./tasks/assets');
const watchTask = require('./tasks/watch');
const reloadTask = require('./tasks/reload');
const spriteTask = require('./tasks/sprite');
const lintTask = require('./tasks/lint');
const scriptsTask = require('./tasks/scripts');
const revTask = require('./tasks/revision');
// add tasks
gulp.task('scss', () => scssTask(gulp, { isDev }));
gulp.task('scripts', () => scriptsTask(gulp));
gulp.task('clean', () => del([`${publicPath}/**`, `!${publicPath}`]));
gulp.task('assets', () => assetsTask(gulp));
gulp.task('sprite', () => spriteTask(gulp));
gulp.task('lint', () => lintTask(gulp));
gulp.task('rev', () => revTask(gulp));
gulp.task('build', gulp.series('clean', 'sprite', 'assets', 'scss', 'scripts', 'rev'));
gulp.task('watch', () => watchTask(gulp));
gulp.task('browser-sync', () => reloadTask(gulp));
gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'browser-sync')));

// default task definition
gulp.task('default', gulp.series(isDev ? 'dev' : 'build'));
