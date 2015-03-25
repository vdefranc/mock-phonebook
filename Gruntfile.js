'use strict';

var LIVERELOAD_PORT = 35729;
var lrSnippet = require( 'connect-livereload' )({ port: LIVERELOAD_PORT });
var mountFolder = function ( connect, dir ) {
  return connect.static( require( 'path' ).resolve( dir ) );
};

module.exports = function ( grunt ) {
  // load all grunt tasks
  require( 'matchdep' ).filterDev( 'grunt-*' ).forEach( grunt.loadNpmTasks );

  grunt.initConfig({
    pkg: grunt.file.readJSON( 'package.json' ),
    concat: {
      js: {
        src: [
          'src/js/_intro.js',
          'src/js/!(_intro|_outro)*.js',
          'src/js/_outro.js'
        ],
        dest: 'dist/<%= pkg.name %>.js'
      },
      css: {
        src: [
          'src/css/template.scss',
          'src/css/!(template)*.scss'
        ],
        dest: 'src/css/compiled/compiled-sass.scss'
      }
    },
    sass: {
      dist: {
        files: {
          'dist/<%= pkg.name %>.css' : 'src/css/compiled/compiled-sass.scss'
        }
      }
    },
    jshint: {
      all: [
        'Gruntfile.js',
        'src/js/**/!(_intro|_outro)*.js'
      ],
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true,
        multistr: true,
        devel: true,
        loopfunc: true,
        force: true,
        '-W032': true,  // Disable "Unnecessary semicolon" error
        '-W097': true,  // Disable error when "use strict" in outermost scope
        globals: {
          Backbone: true,
          console: true,
          document: true,
          Feature: true,
          L: false,
          log: true,
          module: false,
          require: false,
          rootPath: true,
          window: true
        }
      }
    },
    uglify: {
      dist: {
        src: [
          '<%= concat.js.dest %>'
        ],
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    /**
      Automated Live Reload
    */
    watch: {
      options: {
        nospawn: true,
        livereload: LIVERELOAD_PORT
      },
      livereload: {
        files: [
          'index.html',
          'posts/*.md',
          'src/**/*'
        ],
        tasks: [ 'build' ]
      }
    },
    connect: {
      options: {
        port: 9000,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function ( connect ) {
            return [
              lrSnippet,
              mountFolder( connect, '.' )
            ];
          }
        }
      }
    },
    open: {
      server: {
        path: 'http://localhost:<%= connect.options.port %>'
      }
    },
    clean: {
      build: [ 'dist' ]
    }
  });
  
  grunt.registerTask( 'default', 'build' );
  grunt.registerTask( 'build', [ 'jshint', 'concat', 'uglify', 'sass' ]);
  grunt.registerTask( 'server', [
    'build', 'connect:livereload', 'open', 'watch' ] );
};
