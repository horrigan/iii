module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: ["build"],
        copy: {
            main: {
                files: [
                    {expand: true, src: ['app/index.html'], dest: 'build/'},
                    {expand: true, flatten: true, src: ['app/bower_components/bootstrap-css-only/css/bootstrap.min.css'], dest: 'build/app/css/'}

                ]
            }
        },
        ngtemplates: {

            app: {
                src: 'app/templates/**/**.html',
                dest: 'build/app/scripts/templates.js',
                options: {
                    url: function (url) {
                        return url.replace('app/', '');
                    },
                    module: 'bugtracker'
                }
            }
        },
        cssmin: {
            with_banner: {
                files: {
                    'build/app/css/build.min.css': ['app/css/style.css']
                }
            }
        },
        usemin: {
            html: ['build/app/index.html', 'build/app/index.html'],
            options: {
                dest: 'build/app/index.html'
            }
        },
        concat: {
            dist: {
                src: ['app/js/**/*.js'],
                dest: 'build/app/scripts/app.js'
            },
            bower: {
                src: ['app/bower_components/**/*.min.js', '!build/app/bower_components/**/*.min.js'],
                dest: 'build/app/scripts/bower.js'
            }
        },
        uglify: {
            build: {
                src: 'build/app/scripts/app.js',
                dest: 'build/app/scripts/app.min.js'
            },
            bower: {
                src: 'build/app/scripts/vendor.js',
                dest: 'build/app/scripts/vendor.min.js'
            }

        },

        ngmin: {
            app: {
                src: ['app/js/**/*.js'],
                dest: 'build/app/scripts/app.js'
            },
            bower: {
                src: [
                    'app/bower_components/angular/angular.js',
                    'app/bower_components/angular-bootstrap/ui-bootstrap.js',
                    'app/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
                    'app/bower_components/angular-dragdrop/draganddrop.js',
                    'app/bower_components/angular-mocks/angular-mocks.js',
                    'app/bower_components/angular-resource/angular-resource.js',
                    'app/bower_components/angular-route/angular-route.js',
                    'app/bower_components/angular-ui-router/release/angular-ui-router.js'
                ],
                dest: 'build/app/scripts/vendor.js'
            }

        },
        connect: {
            local: {
                options: {
                    port: 8082,
                    base: './app',
                    hostname: "*",
                    keepalive: true
                }
            }

        }
    });
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-ngmin');
    grunt.registerTask('default', ['clean', 'copy', 'cssmin', 'ngmin', 'uglify', 'ngtemplates', 'usemin']);


};