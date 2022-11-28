const webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: './src/index.ts',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'guides.js',
    library: 'guides',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
    ],
  },
};
