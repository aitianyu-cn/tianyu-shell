/**@format */

const path = require("path");

/**
 *
 * @param {*} source the source data to be checked
 * @returns return source data if it is number, return null if it is not.
 */
module.exports.checkNumeric = function (source) {
    if (!Number.isNaN(source)) return source;

    return null;
};

/**
 *
 * @param {*} rootPath      root path of tianyu-page
 * @param {*} targetFile    the target under the tianyu-page
 * @returns return the entire path of the file
 */
module.exports.solveHtmlFile = function (rootPath, targetFile) {
    const result = path.resolve(rootPath, "src/page", targetFile);

    return result;
};

/**
 *
 * @param {*} rootPath      root path of tianyu-app
 * @param {*} targetFile    the target under the tianyu-app
 * @returns return the entire path of the file
 */
module.exports.solveEntryFile = function (rootPath, targetFile) {
    const result = path.resolve(rootPath, "src/app", targetFile);

    return result;
};

/**
 *
 * @param {*} sourceArr a source array
 * @returns return a new array which does not have duplicated value.
 */
module.exports.removeDuplicates = function (sourceArr) {
    const result = [];

    for (const item of sourceArr) {
        !result.includes(item) && result.push(item);
    }

    return result;
};
