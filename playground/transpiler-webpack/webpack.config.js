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
  module: {
    loaders: [
      {
        test: /(\.js)$/,
        loader: __dirname + '/cssx-loader',
        exclude: /node_modules/
      }
    ]
  }
};
