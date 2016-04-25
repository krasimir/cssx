var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: __dirname + '/src/index.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/dist',
    filename: 'script.js'
  },
  cssx: {
    format: 'object'
  },
  module: {
    loaders: [
      {
        test: /(\.js)$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /(\.js)$/,
        loader: 'cssx-loader',
        exclude: /node_modules/
      }
    ]
  }
};
