module.exports = {
  entry: "./lib/pokebounce.js",
  output: {
  	filename: "./lib/bundle.js"
  },
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.node$/,
        loader: 'node-loader'
      }
    ]
  },
  devtool: 'source-map',
};
