/**@format */

const path = require("path");

const { checkNumeric } = require("./webpack/utilities");
const { handleResolve } = require("./webpack/handler");

const { pluginsGenerator } = require("./webpack/pluginHelper");
const webpackEnvSetting = require("./config/webpack");
const modules = require("./webpack/modules");
const devServer = require("./webpack/devServer");

const baseDir = path.resolve(__dirname, "..");

module.exports = {
    entry: {
        index: path.resolve(__dirname, "app/index.js"),
    },
    output: {
        path: path.join(__dirname, "/webpack-build"),
        filename: "package/[name].[contenthash:8].js",
        chunkFilename: "package/[name].chunks.[contenthash:6].js",
        environment: {
            arrowFunction: false,
        },
    },
    module: {
        rules: modules.rules,
    },
    plugins: pluginsGenerator(),
    resolve: handleResolve(baseDir),
    mode: "development",
    devtool: "source-map",
    watchOptions: {
        poll: checkNumeric(webpackEnvSetting.watchOptions.poll) || 1000,
        aggregateTimeout: checkNumeric(webpackEnvSetting.watchOptions.aggregateTimeout) || 1000,
        ignored: webpackEnvSetting.watchOptions.ignore,
    },
    devServer: devServer.generator({
        dir: baseDir,
        port: checkNumeric(webpackEnvSetting.devServer.port) || 1000,
        host: webpackEnvSetting.devServer.host,
    }),
    node: {
        global: true,
    },
};
