/**
 * `mochaTest`
 *
 * ---------------------------------------------------------------
 *
 * test suite files located in `test/`
 * we use the mocha test framework to test.
 *
 * For usage docs see:
 *   https://github.com/gruntjs/grunt-contrib-coffee
 *
 */
module.exports = function(grunt) {

  grunt.config.set('mochaTest', {
    dev: {
      options: {
        reporter: 'spec'
      },
      src: ['test/**.js']
    }
  });

  grunt.loadNpmTasks('grunt-mocha-test');
};
