/**@format */

const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MineCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");

module.exports.pluginsGenerator = function () {
    const plugins = [];

    plugins.push(new CleanWebpackPlugin());

    const htmlPlugin = new HtmlWebpackPlugin({
        title: "tianyu-shell",
        template: path.resolve(__dirname, "../app/index.html"),
        filename: "index.html",
        chunks: ["index"],
        favicon: path.resolve(__dirname, "../app/favicon.ico"),
    });

    plugins.push(htmlPlugin);

    plugins.push(
        new MineCssExtractPlugin({
            filename: "css/[name].[contenthash:8].css",
            chunkFilename: "css/[name].chunk.[contenthash:6].css",
        }),
    );

    plugins.push(
        new webpack.ProvidePlugin({
            process: "process/browser",
        }),
    );

    return plugins;
};
