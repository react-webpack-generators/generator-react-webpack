'use strict';
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({
  port: LIVERELOAD_PORT
});
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

var webpackConfig = require('./webpack.config.js');

module.exports = function (grunt) {
  // Let *load-grunt-tasks* require everything
  require('load-grunt-tasks')(grunt);

  // Read configuration from package.json
  var pkgConfig = grunt.file.readJSON('package.json');
  
  grunt.initConfig({
    pkg: pkgConfig,

    webpack: {
      options: webpackConfig,

      development: {
        entry: './src/scripts/components/<%= pkg.mainInput %>',
        devtool: 'source-map',
        plugins: [],

        output: {
          publicPath: '.tmp/',
          path: '.tmp/scripts/'
        }
      },

      dist: {
        entry: './src/scripts/components/<%= pkg.mainInput %>'
      }
    },

    watch: {
      webpack: {
        files: ['<%= pkg.src %>/scripts/{,*/}*.js',
          '<%= pkg.src %>/styles/{,*/}*.css'
        ],
        tasks: ['test', 'webpack:development']
      },

      livereload: {
        options: {
          livereload: LIVERELOAD_PORT
        },
        files: [
          '<%= pkg.src %>/{,*/}*.html',
          '<%= pkg.src %>/.tmp/scripts/<%= pkg.mainOutput %>.js'
        ]
      }
    },

    connect: {
      options: {
        port: 8000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        base: [
          '.tmp',
          '<%= pkg.src %>'
        ]
      },

      livereload: {
        options: {
          base: [
            '.tmp',
            '<%= pkg.src %>'
          ]
        }
      },
      
      dist: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, pkgConfig.dist)
            ];
          }
        }
      }
    },

    open: {
      server: {
        url: 'http://localhost:<%= connect.options.port %>'
      }
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    },

    copy: {
      dist: {
        files: [
          // includes files within path
          {
            flatten: true,
            expand: true,
            src: ['<%= pkg.src %>/*'],
            dest: '<%= pkg.dist %>/',
            filter: 'isFile'
          },
          {
            flatten: true,
            expand: true,
            src: ['<%= pkg.src %>/images/'],
            dest: '<%= pkg.dist %>/'
          },
        ]
      }
    },

    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= pkg.dist %>'
          ]
        }]
      },
      server: '.tmp'
    }
  });

  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean',
      'connect:livereload',
      'webpack:development',
      'open',
      'watch'
    ]);
  });

  grunt.registerTask('test', ['karma']);

  grunt.registerTask('build', ['clean', 'test', 'copy', 'webpack:dist', 'clean:server']);

  grunt.registerTask('default', []);
};
