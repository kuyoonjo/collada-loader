const { resolve } = require('path');
const p = require('./package.json');

module.exports = {
  target: 'node',
  externalsPresets: { node: true },
  entry: {
    index: ['./src/index.ts'],
  },
  devtool: false,
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: { allowTsInNodeModules: true }
      },
    ],
  },
  resolve: {
    extensions: ['.json', '.ts', '.js'],
    plugins: [],
  },
  output: {
    library: p.name,
    libraryTarget: 'umd',
    filename: '[name].js',
    path: resolve(__dirname, 'build'),
  },
  externals: ['three'],
};