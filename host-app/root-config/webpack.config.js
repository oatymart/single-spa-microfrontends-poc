const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require('dotenv-webpack');

module.exports = (webpackConfigEnv, argv) => {
    const orgName = "oat-sa";
    // Single-spa custom plugins which transform importmaps etc.
    const defaultConfig = singleSpaDefaults({
        orgName,
        projectName: "root-config",
        webpackConfigEnv,
        argv,
        disableHtmlGeneration: true,
        outputSystemJS: true, // https://github.com/single-spa/single-spa/issues/1264#issuecomment-2437910220
    });
    return merge(defaultConfig, {
        plugins: [
            // For replacing .env in the bundled code:
            new Dotenv({
                path: '../../.env'
            }),
            new HtmlWebpackPlugin({
                inject: false,
                template: "src/index.ejs",
                templateParameters: {
                    isLocal: webpackConfigEnv && webpackConfigEnv.isLocal,
                    orgName
                },
            }),
        ],
    });
};
