const { ModuleFederationPlugin } = require("webpack").container;
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const ExternalTemplateRemotesPlugin = require("external-remotes-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const path = require("path");

const deps = require("./package.json").dependencies;

module.exports = () => ({
    devServer: {
        port: 3001,
        liveReload: false,
        hot: true,
    },
    webpack: {
        configure: {
            output: {
                publicPath: "auto",
                clean:true
            },
        },
        plugins: [
            
        new ExternalTemplateRemotesPlugin(),
        new ReactRefreshWebpackPlugin({
            exclude: [/node_modules/, /bootstrap\.js$/],
        }),
            new HtmlWebpackPlugin({
                template: "./public/index.html",
                chunks: ["play"],
            }),
            new ModuleFederationPlugin({
                name: "play", //외부에서 사용할 모듈명.
                library: { type: "var", name: "play" }, //윈도우 스크립트에서 사용할 때의 변수명.
                filename: "remoteEntry.js",
                exposes: {
                    //키 : 외부에서 사용할 컴포넌트명
                    //값 : 해당 컴포넌트 경로
                    "./Play": "./src/Play",
                },
                shared: {
                    ...deps,
                    ui: { singleton: true },
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
