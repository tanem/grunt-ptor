'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    ptor: {
      options: {
        configFile: '/task/config',
        baseUrl: 'http://localhost:1111'
      },
      target: {
        options: {
          configFile: '/target/config',
          baseUrl: 'http://localhost:2222',
          chromeOnly: false,
          params: {
            login: {
              user: 'test',
              password: 'me'
            }
          }
        }
      }
    },

    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  grunt.loadTasks('tasks');
  grunt.loadTasks('test/tasks');

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  grunt.registerTask('test', ['nodeunit']);
  grunt.registerTask('default', ['jshint', 'test']);

};
