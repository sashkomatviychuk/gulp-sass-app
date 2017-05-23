const path = require('path');

const appPath = path.join(__dirname, '../');
const srcPath = `${appPath}src/`;
const publicPath = `${appPath}public/`;
const assetsPath = `${appPath}src/**/*.*`;
const manifestPath = `${appPath}manifest/`;
const sassFiles = `${srcPath}styles/**/*.sass`;
const jsFiles = `${srcPath}js/**/*.js`;
const spritesFiles = `${srcPath}images/sprite/**/*.png`;

module.exports = {
    appPath,
    srcPath,
    publicPath,
    assetsPath,
    manifestPath,
    sassFiles,
    spritesFiles,
    jsFiles,
};
