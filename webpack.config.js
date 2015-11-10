module.exports = {
  entry: './resources/src/js/app.js',
  output: {
    filename: './resources/dist/js/app.js'
  },
  devtool: 'inline-source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js']
  }
};
