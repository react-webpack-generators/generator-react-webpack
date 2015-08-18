'use strict';

var path = require('path');

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'test/spec/**/*.{js,jsx}'
    ],
    preprocessors: {
      'test/spec/**/*.{js,jsx}': ['webpack']
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
        alias: {
          'styles': path.join(process.cwd(), './src/styles/'),
          'components': path.join(process.cwd(), './src/components/')<% if(architecture === 'flux'||architecture === 'reflux') { %>,
          'stores': '../../../src/stores/',
          'actions': '../../../src/actions/'<% } %>,
          'helpers': path.join(process.cwd(), './test/helpers/')
        }
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
    autoWatch: true,
    browsers: ['PhantomJS'],
    reporters: ['dots'],
    captureTimeout: 60000,
    singleRun: false,
    plugins: [
        require('karma-webpack'),
        require('karma-jasmine'),
        require('karma-phantomjs-launcher')
    ]
  });
};
