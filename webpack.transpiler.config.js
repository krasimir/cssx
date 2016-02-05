var webpack = require('webpack');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var env = require('yargs').argv.mode;
var path = require('path');

var appName = 'cssx-transpiler';

var plugins = [], outputFile;

if (env === 'build') {
  plugins.push(new UglifyJsPlugin({ minimize: true }));
  outputFile = appName + '.min.js';
} else {
  outputFile = appName + '.js';
}

var config = {
  entry: __dirname + '/packages/transpiler/src/index.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/packages/transpiler/lib',
    filename: outputFile,
    library: 'CSSXTranspiler',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [
      {
        test: /(\.js)$/,
        loader: "eslint-loader",
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  resolve: {
    root: path.resolve('./packages'),
    extensions: ['', '.js', '.json']
  },
  plugins: plugins
};

module.exports = config;
