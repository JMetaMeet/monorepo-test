const { ModuleFederationPlugin } = require("webpack").container;
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const ExternalTemplateRemotesPlugin = require("external-remotes-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const deps = require("./package.json").dependencies;

module.exports = () => ({
    devServer: {
        historyApiFallback: true,
        port: 3000,
        hot: false,
    },
    webpack: {
        configure: {
            output: {
                publicPath: "auto",
                clean: true,
            },
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "./public/index.html",
                chunks: ["main"],
            }),
            new ModuleFederationPlugin({
                name: "play",
                remotes: {
                    play: `play@http://localhost:3001/remoteEntry.js`,
                },
                shared: {
                    ...deps,
                    react: {
                        singleton: true,
                        eager: true,
                        requiredVersion: deps.react,
                    },
                    "react-dom": {
                        singleton: true,
                        eager: true,
                        requiredVersion: deps["react-dom"],
                    },
                },
            }),
        ],
    },
});
