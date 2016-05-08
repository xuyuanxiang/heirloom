var path = require('path');
var pkg = require('./package.json');
var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');


module.exports = {
    entry: ['./src/rest/http/index.js'],
    output: {
        path: path.join(__dirname, '/dist'),
        filename: pkg.name + '-rest.js'
    },
    resolve: {
        extensions: ['', '.js']
    },
    module: {
        loaders: [
            {test: /\.js$/, loaders: ['babel-loader']}
        ]
    },
    plugins: [commonsPlugin]
};