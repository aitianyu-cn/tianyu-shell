/**@format */

const path = require("path");
const webpackConfigs = require("../config/config");

module.exports.handleResolve = function (baseDir) {
    const tsConfig = require(`${process.cwd()}/tsconfig.json`);
    const tsPaths = tsConfig.compilerOptions.paths;

    const alias = {};
    for (const pathAlias of Object.keys(tsPaths)) {
        const formattedAlias = pathAlias.substring(0, pathAlias.length - 2);
        const targetPath = tsPaths[pathAlias][0];
        const formattedTargetPath = targetPath.substring(0, targetPath.length - 2);
        alias[formattedAlias] = path.resolve(baseDir, formattedTargetPath);
    }

    const resolve = {
        extensions: webpackConfigs.extensions,
        alias: alias,
    };

    return resolve;
};
