# cssx-loader

A CSSX loader for webpack.

## Usage

Install the loader with `npm i cssx-loader -D` and then add it to your `webpack.config.js` file:

```js
var webpack = require('webpack');

module.exports = {
  entry: '...',
  devtool: 'source-map',
  output: {
    path: '...',
    filename: 'bundle.js'
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

```