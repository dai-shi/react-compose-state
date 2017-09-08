module.exports = {
  entry: './example/main.js',
  output: {
    filename: 'bundle.js',
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader' },
    ],
  },
};
