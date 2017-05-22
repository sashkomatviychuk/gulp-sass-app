const path = require('path');

const appPath = path.join(__dirname, '../');
const srcPath = `${appPath}src/`;
const publicPath = `${appPath}public/`;
const assetsPath = `${appPath}src/{fonts,images}/**/*.*`;
const sassFiles = `${srcPath}styles/**/*.sass`;
const spritesFiles = `${srcPath}images/sprite/**/*.png`;

module.exports = {
    appPath,
    srcPath,
    publicPath,
    assetsPath,
    sassFiles,
    spritesFiles,
};
