// webpack.config.js
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin')
var data = require('./data')

module.exports = {
  entry: './entry.js',

  output: {
    filename: 'bundle.js',
    path: 'build',
    libraryTarget: 'umd'
  },

  externals: {
    "fs": "fs"
  },

  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel-loader?stage=1' },
      { test: /\.css/, loader: ExtractTextPlugin.extract("css-loader") },
      { test: /\.md$/, loader: 'markdown-with-front-matter' }
    ]
  },

  plugins: [
    new StaticSiteGeneratorPlugin('bundle.js', data.routes, data),
    new ExtractTextPlugin("styles.css")
  ],

  resolve: {
    extensions: ['', '.js', '.json', '.jsx']
  }
}
