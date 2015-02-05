'use strict';

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'test/helpers/**/*.js',
      'test/spec/components/**/*.js'
    ],
    preprocessors: {
      'test/spec/components/**/*.js': ['webpack']
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
          test: /\.js$/,
          loader: '<% if (es6) { %>6to5!<% }%>jsx-loader?harmony'
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
        }]
      }
    },
    webpackServer: {
      stats: {
        colors: true
      }
    },
    exclude: [],
    port: 8080,
    logLevel: config.LOG_INFO,
    colors: true,
    autoWatch: false,
    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],
    reporters: ['progress'],
    captureTimeout: 60000,
    singleRun: true
  });
};
