module.exports = (grunt) ->
  webpackDistConfig = require('./webpack.dist.config.js')
  webpackDevConfig = require('./webpack.config.js')

  # Read configuration from package.json
  pkg = grunt.file.readJSON('package.json')

  config =
    pkg: pkg
    webpack:
      options: webpackDistConfig
      dist: cache: false

    'webpack-dev-server':
      options:
        hot: true
        port: 8000
        webpack: webpackDevConfig
        publicPath: '/assets/'
        contentBase: './<%= pkg.src %>/'
      start: keepAlive: true

    connect:
      options:
        port: 8000
      dist:
        options:
          keepalive: true
          base: pkg.dist

    open:
      options: delay: 500
      dev: path: 'http://localhost:<%= connect.options.port %>/webpack-dev-server/'
      dist: path: 'http://localhost:<%= connect.options.port %>/'

    karma:
      unit:
        configFile: 'karma.conf.js'

    copy:
      dist:
        files: [
          {
            flatten: true
            expand: true
            src: [ '<%= pkg.src %>/*' ]
            dest: '<%= pkg.dist %>/'
            filter: 'isFile'
          }
          {
            flatten: true
            expand: true
            src: [ '<%= pkg.src %>/images/*' ]
            dest: '<%= pkg.dist %>/images/'
          }
        ]

    clean:
      dist:
        files: [ {
          dot: true
          src: [ '<%= pkg.dist %>' ]
        } ]

  tasks =
    build: ['clean', 'copy', 'webpack']
    test: ['karma']
    prod: ['build', 'open:dist', 'connect:dist']
    default: ['open:dev', 'webpack-dev-server']

  # Project configuration.
  grunt.config.init config
  # Let *load-grunt-tasks* require everything
  require('load-grunt-tasks') grunt
  grunt.registerTask taskName, taskArray for taskName, taskArray of tasks
