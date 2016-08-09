/**
 * `uglify`
 *
 * ---------------------------------------------------------------
 *
 * Minify client-side JavaScript files using UglifyJS.
 *
 * For usage docs see:
 *   https://github.com/gruntjs/grunt-contrib-uglify
 *
 */
module.exports = function(grunt) {

	grunt.config.set('uglify', {
		target: {
                files: [{
                  expand: true,
                  cwd: '.tmp/public/js',
                  src: ['*.js', '!*.min.js'],
                  dest: '.tmp/public/js',
                  ext: '.min.js'
                }]
              }
	});

  grunt.loadNpmTasks('grunt-contrib-uglify');
};
