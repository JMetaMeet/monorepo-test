const { ModuleFederationPlugin } = require("webpack").container;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

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
        plugins: {
            add: [
                new ModuleFederationPlugin({
                    name: "Play",
                    remotes: {
                        //Play: `Play@${process.env.REMOTE_HOST || 'http://localhost:3001'}/remoteEntry.js`,
                        Play: `Play@http://34.64.161.208:9000/remoteEntry.js`,
                    },
                    shared: {
                        ...deps,
                        react: { singleton: true, eager: true, requiredVersion: deps.react },
                        "react-dom": { singleton: true, eager: true, requiredVersion: deps["react-dom"] },
                    },
                }),
            ]
        },
    },
});
