'use strict';

var path = require('path');
var settings = require('./webpack.settings.js');

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'test/helpers/pack/**/*.js',
      'test/helpers/react/**/*.js',
      'test/spec/components/**/*.js'<% if(architecture === 'flux'||architecture === 'reflux') { %>,
      'test/spec/stores/**/*.js',
      'test/spec/actions/**/*.js'<% } %>
    ],
    preprocessors: {
      'test/helpers/createComponent.js': ['webpack'],
      'test/spec/components/**/*.js': ['webpack'],
      'test/spec/components/**/*.jsx': ['webpack']<% if(architecture === 'flux'||architecture === 'reflux') { %>,
      'test/spec/stores/**/*.js': ['webpack'],
      'test/spec/actions/**/*.js': ['webpack']<% } %>
    },
    webpack: {
      cache: true,
      module: {
        loaders: [{
          test: /\.gif/,
          loader: 'url-loader?limit=10000&mimetype=image/gif'
        }, {
          test: /\.jpg/,
          loader: 'url-loader?limit=10000&mimetype=image/jpg'
        }, {
          test: /\.png/,
          loader: 'url-loader?limit=10000&mimetype=image/png'
        }, {
          test: /\.(js|jsx)$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        },<% if (stylesLanguage === 'sass') { %> {
          test: /\.sass/,
          loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded'
        },<% } %><% if (stylesLanguage === 'scss') { %> {
          test: /\.scss/,
          loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded'
        },<% } %><% if (stylesLanguage === 'less') { %> {
          test: /\.less/,
          loader: 'style-loader!css-loader!less-loader'
        },<% } %><% if (stylesLanguage === 'stylus') { %> {
          test: /\.styl/,
          loader: 'style-loader!css-loader!stylus-loader'
        },<% } %> {
          test: /\.css$/,
          loader: 'style-loader!css-loader'
        }, {
          test: /\.woff/,
          loader: 'url-loader?limit=10000&mimetype=application/font-woff'
        }, {
          test: /\.woff2/,
          loader: 'url-loader?limit=10000&mimetype=application/font-woff2'
        }]
      },
      resolve: {
        alias: settings.alias
      }
    },
    webpackMiddleware: {
      noInfo: true,
      stats: {
        colors: true
      }
    },
    exclude: [],
    port: 8080,
    logLevel: config.LOG_INFO,
    colors: true,
    autoWatch: false,
    browsers: ['PhantomJS'],
    reporters: ['dots'],
    captureTimeout: 60000,
    singleRun: true,
    plugins: [
        require('karma-webpack'),
        require('karma-jasmine'),
        require('karma-phantomjs-launcher')
    ]
  });
};
