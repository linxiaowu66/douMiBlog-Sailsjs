/**
 * `jshint`
 *
 * ---------------------------------------------------------------
 *
 * syntax checking
 *
 * For usage docs see:
 *   https://github.com/gruntjs/grunt-contrib-jshint
 *
 */
module.exports = function(grunt) {

  grunt.config.set('jshint', {
   all:{
    options: {
      jshintrc: '.jshintrc'
    },
    files: {
      src: ['assets/js/*.js', 'api/**']
    },
   }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
};
