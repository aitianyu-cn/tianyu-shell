/**@format */

module.exports = {
    watchOptions: {
        poll: 1000,
        aggregateTimeout: 1000,
        ignore: /node_modules/,
    },
    devServer: {
        port: 8000,
        host: "0.0.0.0",
    },
};
