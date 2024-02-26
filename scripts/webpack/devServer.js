/**@format */

const path = require("path");

const webpackConfigs = require("../config/config");
const proxyData = webpackConfigs.proxy;
const staticData = webpackConfigs.static;

const historyApiFallback = {
    rewrites: [],
};

const devServerStatic = function (dir) {
    const staticSrc = [];

    if (Array.isArray(staticData)) {
        for (const item of staticData) {
            staticSrc.push({
                directory: path.resolve(dir, "src", item.directory),
                publicPath: item.publicPath,
            });
        }
    }

    return staticSrc;
};

module.exports.generator = function getDevServer(option, fallback) {
    option = option || {};

    const devHost = option.host || "0.0.0.0";
    const devPort = option.port || 8080;
    const dir = option.dir || __dirname;

    const config = {
        proxy: proxyData || {},
        historyApiFallback: fallback || historyApiFallback,
        compress: false,
        hot: true,
        static: devServerStatic(dir),
        host: devHost,
        port: devPort,
        allowedHosts: "all",
    };

    return config;
};
