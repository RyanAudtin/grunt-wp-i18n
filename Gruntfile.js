/*
 * grunt-wp-i18n
 * https://github.com/blazersix/grunt-wp-i18n
 *
 * Copyright (c) 2014 Blazer Six, Inc.
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

	grunt.loadTasks( 'tasks' );
	grunt.loadNpmTasks( 'grunt-contrib-clean' );
	grunt.loadNpmTasks( 'grunt-contrib-copy' );
	grunt.loadNpmTasks( 'grunt-contrib-jshint' );
	grunt.loadNpmTasks( 'grunt-contrib-nodeunit' );

	grunt.config.init({

		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			all: [
				'Gruntfile.js',
				'tasks/*.js',
				'tasks/lib/*.js'
			]
		},

		// Before generating any new files, remove any previously-created files.
		clean: {
			tests: ['tmp']
		},

		copy: {
			tests: {
				files: [
					{
						expand: true,
						cwd: 'test/fixtures',
						src: [ '**' ],
						dest: 'tmp/'
					}
				]
			}
		},

		// Configuration to be run (and then tested).
		makepot: {
			basic_plugin: {
				options: {
					cwd: 'tmp/basic-plugin',
					type: 'wp-plugin'
				}
			},
			different_slugs: {
				options: {
					cwd: 'tmp/different-slugs',
					type: 'wp-plugin'
				}
			},
			plugin_headers: {
				options: {
					cwd: 'tmp/plugin-headers',
					type: 'wp-plugin'
				}
			},
			ignore_headers: {
				options: {
					cwd: 'tmp/plugin-headers',
					domainPath: '.',
					potFilename: 'override.pot',
					type: 'wp-plugin'
				}
			},
			basic_theme: {
				options: {
					cwd: 'tmp/basic-theme',
					exclude: ['exclude/.*'],
					type: 'wp-theme'
				}
			}
		},

		// Unit tests.
		nodeunit: {
			tests: ['test/*_test.js'],
		}

	});

	// Register default task.
	grunt.registerTask( 'default', ['jshint', 'test']);

	// Whenever the "test" task is run, first clean the "tmp" dir,
	// copy the "fixtures", then run this plugin's task(s), then test the result.
	grunt.registerTask( 'test', ['clean', 'copy', 'makepot', 'nodeunit']);

};
