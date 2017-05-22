const path = require('path');

const appPath = path.join(__dirname, '../');
const srcPath = `${appPath}src/`;
const publicPath = `${appPath}public/`;
const assetsPath = `${appPath}src/{fonts,images,}/**/*.*`;
const manifestPath = `${appPath}manifest/`;
const sassFiles = `${srcPath}styles/**/*.sass`;
const spritesFiles = `${srcPath}images/sprite/**/*.png`;

module.exports = {
    appPath,
    srcPath,
    publicPath,
    assetsPath,
    manifestPath,
    sassFiles,
    spritesFiles,
};
