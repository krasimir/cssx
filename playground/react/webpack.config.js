var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: './src/index.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/lib',
    filename: 'app.js'
  },
  module: {
    loaders: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'cssx-loader',
        exclude: /node_modules/
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel',
        exclude: /(node_modules|bower_components)/,
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'react']
        }
      }      
    ]
  },
  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js', '.jsx']
  }
};
