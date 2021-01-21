const path = require('path');
module.exports = {
  entry : {
    standardPlay: './js/standardPlay.js',
    singlePlay: './js/singlePlay.js',
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "ts-loader",
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: ["style-loader", "css-loader",'sass-loader']
      },
      {
        test: /\.(ya?ml)$/,
        loader: "js-yaml-loader"
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          publicPath: `/static/gamemain/img/`,
          outputPath: `img/`,
        },
      },
    ]
  },
  resolve: {
    alias: {
      Utilities: path.resolve(__dirname, 'js/Utilities/'),
      Components: path.resolve(__dirname, 'js/components/'),
      GameRules: path.resolve(__dirname, 'js/GameRules/'),
    },
    extensions: ["*", ".js", ".jsx",".ts",".tsx"]
  },
  output: {
    path: path.resolve(__dirname, 'static/gamemain'),
    filename: '[name].js'
  }
};