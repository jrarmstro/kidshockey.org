module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		compass: {
			dist: {
				options: {
					sassDir: 'src/public_html/style',
					cssDir: 'dist/public_html/style',
					cacheDir: 'src/public_html/style'
				}
			}
		},
		copy: {
			main: {
				files: [
					{
						expand: true,
						cwd: 'src',
						src: ['**',
							  '!**/*.scss',
							  '!src/public_html/script/*.js'],
						dest: 'dist/'
					}
				]
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
				ie8: true
			},
			build: {
				files: [{
					expand: true,
					src: 'src/public_html/script/*.js',
					dest: 'dist/public_html/script'
				}]
			}
		},
		clean: ['dist']
	});

	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-clean');

	grunt.registerTask('default', ['clean', 'compass', 'uglify', 'copy']);
};