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
							  '!**/*.scss*', // ignore both .scss and .scssc
							  '!**/*.js'],
						dest: 'dist'
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
					cwd: 'dist',
					src: 'public_html/script/*.js',
					dest: 'dist'
				}]
			}
		},
		clean: ['dist'],
		watch: {
			script: {
				files: ['src/public_html/script/*.js'],
				tasks: ['babel', 'uglify']
			},
			style: {
				files: ['src/public_html/style/*.scss'],
				tasks: ['compass']
			},
			other: {
				files: ['src/**',
					    '!src/public_html/script/*.js',
					    '!src/public_html/style/*.scss'],
				tasks: ['copy']
			}
		},
		babel: {
			options: {
				sourceMap: true,
				presets: ['env']
			},
			dist: {
				files: [{
					expand: true,
					cwd: 'src',
					src: 'public_html/script/*.js',
					dest: 'dist'
				}]
			}
		},
		cleanempty: ['dist/**']
	});

	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-babel');
	grunt.loadNpmTasks('grunt-cleanempty');

	grunt.registerTask('default', ['clean', 'compass', 'babel', 'uglify', 'copy', 'cleanempty']);
};