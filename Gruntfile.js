module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		connect: {
			server: {
				options: {
					port: 9001,
					open : true,
					livereload : true
				}
			}
		},

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
			options: {
				implementation: require('node-sass'),
				outputStyle: 'compressed',
				sourceMap: true
			},
			dist: {
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
					compress: false
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
				files: ['src/**/*'],
				tasks: 'templates'
			}
		}
	});

	/* a custom task to create static html files */
	grunt.registerTask('templates', 'Compiles html templates for all implementations.', function() {
		var implementation,
		  html,
			done = this.async(),
			Handlebars = require('handlebars'),
			minifier = require('html-minifier').minify,
			data = grunt.file.readJSON('src/data.json'),
			source = grunt.file.read('src/template.html'),
			template = Handlebars.compile(source),
			getHtml = function(data, implementation, isHomepage) {
				var html;

				data._implementation = data.implementations[implementation];
				data._isHomepage = isHomepage;
				data._website = {
					version: grunt.config.data.pkg.version
				};

				html = template(data);

				/* try to minify */
				try {
					html = minifier(html, {
						removeComments: true,
						collapseWhitespace: true
					});
				} catch (err) {
					grunt.warn('Could not minify "'+implementation+'"');
				}

				return html;
			};

		grunt.log.writeln('Compiling templates...');

		/* for each implementation, create a folder with an index.html in it */
		for (implementation in data.implementations) {
			/* produce html for the implementation */
			html = getHtml(data, implementation, false);
			grunt.file.write(implementation+'/index.html', html);

			/* also create the main `index.html` for the root directory (from javascript version) */
			if (implementation === 'javascript') {
				html = getHtml(data, implementation, true);
				grunt.file.write('index.html', html);
			}
		}

		return done();
	});

	/* auto-load all tasks that start with `grunt-` */
	require('load-grunt-tasks')(grunt);
	grunt.registerTask('default', [
		'sass',
		'uglify',
		'templates',
		'connect',
		'watch'
	]);
};
