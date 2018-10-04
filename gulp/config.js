const path = require('path');

const appPath = path.join(__dirname, '..');
const srcPath = `${appPath}/src`;
const publicPath = `${appPath}/public`;
const manifestPath = `${appPath}/manifest`;
const scssFiles = `${srcPath}/scss/**/*.scss`;
const jsFiles = `${srcPath}/js/**/*.js`;
const spritesFiles = `${srcPath}/images/sprite/**/*.png`;
const assetsPath = `${srcPath}/**/*.*`;

module.exports = {
    appPath,
    srcPath,
    publicPath,
    assetsPath,
    manifestPath,
    scssFiles,
    spritesFiles,
    jsFiles,
};
