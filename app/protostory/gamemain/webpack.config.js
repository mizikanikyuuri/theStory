const path = require('path');

module.exports = {
  entry: './js/index.js',
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          publicPath: `/static/portal/img/`,
          outputPath: `/img/`,
        },
      },
    ]
  },
  resolve: {
    alias: {
      Utilities: path.resolve(__dirname, 'js/utilities/') ,
      Components: path.resolve(__dirname, 'js/components/') ,
    },
    extensions: ["*", ".js", ".jsx"]
  },
  output: {
    filename: 'client.min.js',
    path: path.resolve(__dirname, 'static/gamemain'),
  },
};