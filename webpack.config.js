// webpack.config.js
var StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin')
var data = require('./data')

module.exports = {
  entry: './entry.js',

  output: {
    filename: 'bundle.js',
    path: 'build',
    libraryTarget: 'umd'
  },

  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel-loader?stage=1' },
      { test: /\.css/, loader: 'css-loader!cssnext-loader' },
      { test: /\.md$/, loader: 'markdown-with-front-matter' }
    ]
  },

  plugins: [
    new StaticSiteGeneratorPlugin('bundle.js', data.routes, data)
  ],

  cssnext: {
    compress: true,
    features: {
      rem: false,
      pseudoElements: false,
      colorRgba: false
    }
  },

  resolve: {
    extensions: ['', '.js', '.json', '.jsx'],
    alias:{
        fs: require.resolve('fs')
    }
  }
}
