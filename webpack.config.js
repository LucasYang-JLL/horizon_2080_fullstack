module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
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
                        loader: 'file-loader?name=/img/[name].[ext]' 
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
};
