module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            main: {
                expand: true,
                cwd: 'dev_app',
                src: '**',
                dest: 'dist'
            }
        },
        clean: {
            build: {
                src: ['dist']
            },
            dist: {
                src: ['dist/js/*', 'dist/js/lib', '!dist/js/*.min.js', '!dist/css/*.min.js', '!dist/js/lib.js', 'dist/views', 'dist/css/*', '!dist/css/*.min.css', 'dist/css/lib', 'dist/css/ui', 'dist/design']
            }
        },
        cssmin: {
            options: {
                mergeIntoShorthands: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'dist/css/style.min.css': 'dist/css/style.min.css'
                }
            }
        },
        handlebars: {
            dev: {
                options: {
                    namespace: 'templete',
                    processName: function (filePath) {
                        return filePath.replace("dev_app/views/", '').replace(/\.hbs$/, '');
                    }
                },
                files: {
                    'dev_app/js/templete.js': [
                        'dev_app/views/**/*.hbs',
                        'dev_app/views/**/*.js'
                    ]
                }
            },
            dist: {
                options: {
                    namespace: 'templete',
                    processName: function (filePath) {
                        return filePath.replace("dist/views/", '').replace(/\.hbs$/, '');
                    }
                },
                files: {
                    'dist/js/templete.js': ['dist/views/**/*.hbs']
                }
            }
        },
        concat: {
            dev: {
                files: {
                    'dev_app/js/views.js': ['dev_app/views/*/*.js'],
                    'dev_app/js/helper.js': ['dev_app/js/helper/*.js'],
                    'dev_app/js/router.js': ['dev_app/js/router/*.js'],
                    'dev_app/js/models.js': ['dev_app/js/models/*.js']
                }
            },
            dist: {
                files: {
                    'dist/js/views.js': ['dist/js/views/*.js'],
                    'dist/js/helper.js': ['dist/js/helper/*.js'],
                    'dist/js/router.js': ['dist/js/router/*.js'],
                    'dist/js/models.js': ['dist/js/models/*.js']
                }
            },
            distJs: {
                files: {
                    'dist/js/skApp.min.js': [
                        'dist/js/lib.js',
                        'dist/js/templete.min.js',
                        'dist/js/app.min.js',
                        'dist/js/models.min.js',
                        'dist/js/router.min.js',
                        'dist/js/helper.min.js'
                    ]
                }
            },
            lib: {
                files: {
                    'dev_app/js/lib.js': [
                        'dev_app/js/lib/jquery-3.2.1.min.js',
                        'dev_app/js/lib/jquery-touch-events.js',
                        'dev_app/js/lib/handlebars.min.js',
                        'dev_app/js/lib/underscore-min.js',
                        'dev_app/js/lib/backbone-min.js',
                        'dev_app/js/lib/moment.min.js',
                        'dev_app/js/lib/moment-ko.js',
                        'dev_app/js/lib/async.js',
                        'dev_app/js/lib/jquery.bxslider.min.js',
                        'dev_app/js/lib/hammer.min.js',
                        'dev_app/js/lib/hammer.fakemultitouch.js',
                        'dev_app/js/lib/drum.js',
                        'dev_app/js/lib/highcharts.js',
                        'dev_app/js/lib/annotations.js'
                    ]
                }
            },
            css: {
                files: {
                    'dist/css/style.min.css': [
                        'dist/css/lib/*.css',
                        'dist/css/ui/ui.common.css',
                        'dist/css/ui/ui.layout.css',
                        'dist/css/ui/ui.page.css'
                    ]
                }
            }
        },
        uglify: {
            dist: {
                options: {
                    mangle: false
                },
                files: {
                    'dist/js/lib.js': 'dist/js/lib.js',
                    'dist/js/app.min.js': 'dist/js/app.js',
                    'dist/js/views.min.js': 'dist/js/views.js',
                    'dist/js/helper.min.js': 'dist/js/helper.js',
                    'dist/js/router.min.js': 'dist/js/router.js',
                    'dist/js/models.min.js': 'dist/js/models.js',
                    'dist/js/templete.min.js': 'dist/js/templete.js'
                }
            }
        },
        watch: {
            views: {
                files: [
                    'dev_app/views/*/*.js',
                    'dev_app/js/helper/*.js',
                    'dev_app/js/models/*.js',
                    'dev_app/js/router/*.js',
                    'dev_app/js/models/*.js'
                ],
                tasks: ['concat:dev']
            },
            hbs: {
                files: ['dev_app/views/*/*.hbs'],
                tasks: ['handlebars:dev']
            }
        },
        replace: {
            distIndex: {
                src: ['dist/index.html'],
                overwrite: true,
                replacements: [{
                    from: '<link rel="stylesheet" href="css/ui/ui.style.css">',                  // string replacement
                    to: '<link rel="stylesheet" href="css/style.min.css?rel=<%= grunt.template.today("yyyy-mm-dd") %>">'
                }, {
                    from: '<script src="js/lib.js"></script><script src="js/templete.js"></script><script src="js/app.js"></script><script src="js/models.js"></script><script src="js/router.js"></script><script src="js/helper.js"></script><script src="js/views.js"></script>',                  // string replacement
                    to: '<script src="js/skApp.min.js?rel=<%= grunt.template.today("yyyy-mm-dd") %>"></script><script src="js/views.min.js?rel=<%= grunt.template.today("yyyy-mm-dd") %>"></script>'
                }]
            },
            distCss: {
                src: ['dist/css/style.min.css'],
                overwrite: true,
                replacements: [{
                    from: '../../',
                    to: '../'
                }]
            },
            distModels: {
                src: ['dist/js/models.min.js'],
                overwrite: true,
                replacements: [{
                    from: 'var ubiveloxSKT="http://hybridstg2.sktsmarthome.com:30000/skt"',
                    to: 'var ubiveloxSKT="/skt"'
                }]
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    // Default task(s).
    grunt.registerTask('default', [
        'clean:build',
        'sync',
        'copy',
        'concat:dev',
        'concat:lib',
        'uglify:dist',
        'concat:dist',
        'concat:css',
        'cssmin',
        'concat:distJs',
        'clean:dist',
        'replace:distIndex',
        'replace:distCss',
        'replace:distModels'
    ]);
    grunt.registerTask('sync', [
        'handlebars:dev',
        'concat:dev'
    ]);
    grunt.registerTask('runWatch', ['watch']);
};