const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './src/components/index.ts',
  mode: 'production',
  devtool: 'inline-source-map',
  output: {
    filename: 'index.js', // <-- Important
    libraryTarget: 'this', // <-- Important
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: [/node_modules/],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  externals: [nodeExternals()], // <-- Important
};
