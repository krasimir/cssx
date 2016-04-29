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
  cssx: {
    minify: false
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

*If you use `cssx-loader` along with React make sure that you place it at the end of the `loaders` array. It's important that you get the CSSX `<style>` tags resolved first, before they reach the JSX transpiler.*

*Notice that if you need to pass settings to the transpiler you have to use `cssx` property of the webpack's configuration.*