'use strict';

var webpack = require('webpack');

var loaders = [{
    test: /\.css$/,
    loader: 'style!css'
  }, {
    test: /\.gif/,
    loader: 'url-loader?limit=10000&minetype=image/gif'
  }, {
    test: /\.jpg/,
    loader: 'url-loader?limit=10000&minetype=image/jpg'
  }, {
    test: /\.png/,
    loader: 'url-loader?limit=10000&minetype=image/png'
  }, {
    test: /\.jsx$/,
    loader: 'jsx-loader'
  }];

module.exports = {
  output: {
    publicPatch: 'dist/',
    path: 'dist/scripts/',
    filename: 'main.js'
  },
  debug: true,
  cache: true,
  stats: {
    colors: true,
    reasons: true
  },
  module: {
    preLoaders: [{
      test: '\\.js$',
      exclude: 'node_modules',
      loader: 'jshint'
    }],
    loaders: loaders
  }
};