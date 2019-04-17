const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin')

var config = {
    entry: ["babel-polyfill", "./horizon_2080/frontend/src/index.js"],
    output: {},
    // optimization: {
    //     splitChunks: {
    //         chunks: "all"
    //     }
    // },
    optimization: {
        runtimeChunk: "single",
        splitChunks: {
            chunks: "all",
            maxInitialRequests: Infinity,
            minSize: 0,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name(module) {
                        // get the name. E.g. node_modules/packageName/not/this/part.js
                        // or node_modules/packageName
                        const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

                        // npm package names are URL-safe, but some servers don't like @ symbols
                        return `npm.${packageName.replace("@", "")}`;
                    }
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    // "file-loader",
                    {
                        loader: "file-loader?name=/img/[name].[ext]"
                        // options: {
                        //     bypassOnDebug: true, // webpack@1.x
                        //     disable: true // webpack@2.x and newer
                        // }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    }
}
const HtmlWebpackPluginConfigLocal = new HtmlWebpackPlugin({
    template: "./public/index_local.ejs",
    filename: 'index.html',
    inject: false,
})

const HtmlWebpackPluginConfigProd = new HtmlWebpackPlugin({
    template: "./public/index_prod.ejs",
    filename: 'index.html',
    inject: false,
})

const outputDev = {
    path: path.resolve(__dirname, "./horizon_2080/static/dev"),
    filename: "[name].js"
}

const outputProd = {
    path: path.resolve(__dirname, "./horizon_2080/static/prod"),
    filename: "[name].[contenthash].js"
}

module.exports = (env, argv) => {
    if (argv.mode === "development") {
        config.output = outputDev;
        config.plugins= [HtmlWebpackPluginConfigLocal];
    }

    if (argv.mode === "production") {
        config.output = outputProd;
        config.plugins= [HtmlWebpackPluginConfigProd];
    }
    return config;
};
