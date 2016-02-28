var path = require('path');
var webpack = require('webpack');


<!-- entry: path.resolve(__dirname, 'main.jsx')-->

module.exports = {
    devtool: 'source-map',
    entry: [
        path.resolve(__dirname, 'main.jsx')
    ],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    devServer: {
        contentBase: "./build",
        colors: true,
        historyApiFallback: true,
        inline: true,
        port:3000,
        hot:true,
        proxy:{
            '/gradms/bsuims/*.do':{
                    target: 'http://192.168.0.197:8090/',
                    secure: false
            }
        }
    },
    plugins: [
       new webpack.HotModuleReplacementPlugin()
    ],module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            {test:/\.json$/,loader:"json"},
            {
                test: /\.jsx?$/,
                loader:'babel',
                exclude:'/node_modules/',
                query: {
                    presets: ['es2015','react']
                }
            }
        ]
    }
};