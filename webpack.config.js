var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'source-map',

    entry: __dirname + '/app/main.js',
    output: {
        path: __dirname + '/build',
        filename: "bundle.js"
    },

    module: {
        loaders: [
            {test: /\.json$/, loader: 'json-loader'},
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + '/app/index.tmpl.html'
        })
    ],

    devServer: {
        historyApiFallback: true,
        inline: true
    }
};