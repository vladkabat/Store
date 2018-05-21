const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin  = require('mini-css-extract-plugin');

module.exports = {

    performance: { hints: false },

    devtool: 'cheap-module-source-map',

    devServer: {
        port: 7777,
        host: 'localhost',
        historyApiFallback: true,
        noInfo: false,
        stats: 'minimal',
        contentBase: './static',
        hot: true
    },

    entry: {
        index: './src/index.js'
    },

    output: {
        filename: 'js/[name].bundle.js',
        path: path.resolve(__dirname, 'static'),
        sourceMapFilename: 'map/[name].map'
    },

    resolve: {
        extensions: ['.js', '.jsx'],
        modules: ['src', 'node_modules']
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.jsx?$/,
                include: path.resolve(__dirname, 'src'),
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin ({
            filename: 'css/style.css',
            chunkFilename: '[id].css'
        })
    ]
};