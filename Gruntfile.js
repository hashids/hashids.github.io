
module.exports = function(grunt) {
	
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		jshint: {
			options: {
				curly: true,
				eqeqeq: true,
				eqnull: true,
				ignores: 'public/js/lib/*.js'
			},
			files: 'public/js/src/*.js'
		},
		
		bump: {
			options: {
				files: 'package.json',
				commit: false,
				createTag: false,
				push: false
			}
		},
		
		sass: {
			dist: {
				options: {
					style: 'compressed'
				},
				files: {
					'public/css/lib/app-<%= pkg.version %>.min.css': 'public/css/src/app.scss'
				}
			}
		},
		
		uglify: {
			watch: {
				options: {
					mangle: true,
					preserveComments: false,
					compress: true
				},
				files: {
					'public/js/lib/app-<%= pkg.version %>.min.js': [
						'public/js/src/*.js'
					]
				}
			}
		},
		
		watch: {
			lint: {
				files: 'public/js/src/app.js',
				tasks: 'jshint'
			},
			js: {
				files: 'public/js/src/*.js',
				tasks: 'uglify'
			},
			css: {
				files: 'public/css/**/*.scss',
				tasks: 'sass'
			},
			html: {
				files: ['dev/**/*'],
				tasks: 'templates'
			}
		}
		
	});
	
	/* a custom task to create static html files */
	
	grunt.registerTask('templates', 'Compiles html templates for all implementations.', function() {
		
		var implementation, content, html,
			done = this.async(),
			Handlebars = require('handlebars'),
			minifier = require('html-minifier').minify,
			data = grunt.file.readJSON('dev/data.json'),
			source = grunt.file.read('dev/template.html'),
			template = Handlebars.compile(source);
		
		grunt.log.writeln('Compiling templates...');
		
		/* for each implementation, create a folder with an index.html in it */
		
		for (implementation in data) {
			
			/* produce html */
			
			content = data[implementation];
			content.website = {
				version: grunt.config.data.pkg.version
			};
			
			html = template(content);
			
			/* try to minify */
			
			try {
				
				html = minifier(html, {
					removeComments: true,
					collapseWhitespace: true
				});
				
			} catch (err) {
				grunt.warn('Could not minify "'+implementation+'"');
			}
			
			/* finally write the file to the right folder */
			
			grunt.file.write(implementation+'/index.html', html);
			
			/* also create the main `index.html` for the root directory (from javascript version) */
			
			if (implementation === 'javascript') {
				content.title = 'Hashids';
				grunt.file.write('index.html', html);
			}
			
		}
		
		return done();
		
	});
	
	/* auto-load all tasks that start with `grunt-` */
	
	require('load-grunt-tasks')(grunt);
	grunt.registerTask('default', ['watch']);
	
};
