const gulp = require('gulp');
const del = require('del');

// load data from config
const { publicPath } = require('./config');
const isDev = !process.env.NODE_ENV || process.env.NODE_ENV !== 'production';

// require gulp tasks
const sassTask = require('./tasks/sass');
const assetsTask = require('./tasks/assets');
const watchTask = require('./tasks/watch');
const reloadTask = require('./tasks/reload');
const spriteTask = require('./tasks/sprite');

// add tasks
gulp.task('sass', () => sassTask(gulp, { isDev }));
gulp.task('clean', () => del([`${publicPath}/**`, `!${publicPath}`]));
gulp.task('assets', () => assetsTask(gulp, { isDev }));
gulp.task('sprite', () => spriteTask(gulp));
gulp.task('build', gulp.series('clean', 'sprite', 'assets', 'sass'));
gulp.task('watch', () => watchTask(gulp));
gulp.task('browser-sync', () => reloadTask(gulp));
gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'browser-sync')));

// default task definition
gulp.task('default', gulp.series(isDev ? 'dev' : 'build'));
