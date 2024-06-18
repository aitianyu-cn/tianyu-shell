/**@format */

module.exports.extensions = [".ts", ".js", ".css", ".view.json", ".i18n.js", ".tsx", "png", "svg"];

module.exports.proxy = {
    "/remote-resources": {
        target: "https://resource.aitianyu.cn/resources",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
            "^/remote-resources": "",
        },
    },
};

module.exports.static = [];

module.exports.resolve = {
    fallback: {},
};
