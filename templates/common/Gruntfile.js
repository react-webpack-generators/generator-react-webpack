'use strict';
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({
  port: LIVERELOAD_PORT
});
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
  // Let *load-grunt-tasks* require everything
  require('load-grunt-tasks')(grunt);
  // Read configuration from package.json
  var pkgConfig = grunt.file.readJSON('package.json');
  var jshintConfig = grunt.file.readJSON('.jshintrc');

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
    test: /\.js$/,
    loader: 'jsx-loader'
  }];

  grunt.initConfig({
    pkg: pkgConfig,
    webpack: {
      development: {
        entry: './<%= pkg.src %>/scripts/components/<%= pkg.mainInput %>.js',
        output: {
          path: '.tmp/scripts/',
          filename: '<%= pkg.mainOutput %>.js'
        },
        debug: true,
        cache: true,
        devtool: 'source-map',
        stats: {
          colors: true,
          reasons: true
        },
        jshint: grunt.util._.merge(jshintConfig, {
          emitErrors: false,
          failOnHint: false
        }),
        module: {
          preLoaders: [{
            test: '\\.js$',
            exclude: 'node_modules',
            loader: 'jshint'
          }],
          loaders: loaders
        }
      },
      dist: {
        entry: './<%= pkg.src %>/scripts/components/<%= pkg.mainInput %>.js',
        output: {
          path: '.tmp/scripts/',
          filename: '<%= pkg.mainOutput %>.dev.js'
        },
        debug: false,
        cache: true,
        stats: {
          colors: true,
          reasons: true
        },
        jshint: grunt.util._.merge(jshintConfig, {
          emitErrors: false,
          failOnHint: false
        }),
        module: {
          preLoaders: [{
            test: '\\.js$',
            exclude: 'node_modules',
            loader: 'jshint'
          }],
          loaders: loaders
        }
      }
    },
    watch: {
      webpack: {
        files: ['<%= pkg.src %>/scripts/{,*/}*.js',
          '<%= pkg.src %>/styles/{,*/}*.css'
        ],
        tasks: ['test','webpack:development']
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
        hostname: 'localhost'
      },
      livereload: {
        options: {
          base: [
            '.tmp',
            pkgConfig.src
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

    uglify: {
      dist: {
        files: {
          '<%= pkg.dist %>/scripts/<%= pkg.mainOutput %>.js': ['.tmp/scripts/<%= pkg.mainOutput %>.dev.js']
        }
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
    },
  });

  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'connect:livereload',
      'webpack:development',
      'open',
      'watch'
    ]);
  });

  grunt.registerTask('test', ['karma']);

  grunt.registerTask('build', ['clean', 'test', 'copy', 'webpack:dist', 'uglify', 'clean:server']);

  grunt.registerTask('default', []);
};
