/**@format */

const path = require("path");

module.exports.rules = [
    {
        test: /\.ts$/,
        use: [
            {
                loader: "babel-loader",
                options: {
                    presets: [
                        [
                            "@babel/preset-env",
                            {
                                corejs: "3",
                                useBuiltIns: "usage",
                            },
                        ],
                    ],
                },
            },
            "ts-loader",
        ],
        exclude: /node_modules/,
    },
    {
        test: /\.properties$/,
        use: [
            // {
            //     loader: "babel-loader",
            //     options: {
            //         presets: [
            //             [
            //                 "@babel/preset-env",
            //                 {
            //                     corejs: "3",
            //                     useBuiltIns: "usage",
            //                 },
            //             ],
            //         ],
            //     },
            // },
            path.resolve(process.cwd(), "dist/lib/webpack/loader/MsgBundleLoader"),
        ],
        exclude: /node_modules/,
    },
    {
        test: /\.less$/i,
        exclude: /(node_modules|bower_components)/,
        use: ["css-loader", "less-loader"],
    },
    {
        test: /\.css$/i,
        exclude: /(node_modules|bower_components)/,
        use: ["css-loader"],
    },
];
