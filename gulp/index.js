const gulp = require('gulp');
const del = require('del');

// load data from config
const { appPath } = require('./config');
const isDev = !process.env.NODE_ENV || process.env.NODE_ENV !== 'production';

// require gulp tasks
const sassTask = require('./tasks/sass');
const assetsTask = require('./tasks/assets');
const watchTask = require('./tasks/watch');
const reloadTask = require('./tasks/reload');
const spriteTask = require('./tasks/sprite');

// add tasks
gulp.task('sass', () => sassTask(gulp, { appPath, isDev }));
gulp.task('clean', () => del([`${appPath}public/**`, `!${appPath}public`]));
gulp.task('assets', () => assetsTask(gulp, { appPath, isDev }));
gulp.task('sprite', () => spriteTask(gulp, { appPath }));
gulp.task('build', gulp.series('clean', 'assets', 'sass'));
gulp.task('watch', () => watchTask(gulp, { appPath }));
gulp.task('browser-sync', () => reloadTask(gulp, { appPath } ));
gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'browser-sync')));

// default task definition
gulp.task('default', gulp.series(isDev ? 'dev' : 'build'));
