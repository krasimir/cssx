var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: __dirname + '/src/app.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
    library: 'MyApp',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  cssx: {
    format: 'array'
  },
  module: {
    loaders: [
      {
        test: /(\.js)$/,
        loader: 'cssx-loader',
        exclude: /node_modules/
      }
    ]
  }
};
