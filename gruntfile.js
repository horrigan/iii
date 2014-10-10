module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            js: ["build/**/*.*"]
        },
        copy: {
            main: {
                files: [
                    // includes files within path

                    // includes files within path and its sub-directories
                    {expand: true, src: ['app/index.html'], dest: 'build/'}


                ]
            }
        },
        ngtemplates: {
            app: {
                src: 'app/templates/**/**.html',
                dest: 'build/app/scripts/templates.js',
                options: {
                    htmlmin: { collapseWhitespace: true, collapseBooleanAttributes: true }


                }
            }
        },
        cssmin: {
            with_banner: {
                option: {
                    banner: 'my minified css*?'
                },
                files: {
                    'build/app/css/build.min.css': ['app/css/style.css']
                }
            }
        },
        usemin: {
            html: ['build/app/index.html','build/app/index.html'],
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
                src: 'build/app/scripts/vendor.js',
                dest: 'build/app/scripts/vendor.min.js'
            },
            bower:{
                src: 'build/app/scripts/bower_components.js',
                dest: 'build/app/scripts/bower_components.min.js'
            }

        },

        ngmin: {
            app: {
                src: ['app/js/**/*.js'],
                dest: 'build/app/scripts/vendor.js'
            },
            bower:{
                src: ['app/bower_components/**/*.js','!app/bower_components/**/*.min.js'],
                dest: 'build/app/scripts/bower_components.js'
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
    grunt.registerTask('default', ['clean','copy','cssmin','ngmin','uglify','ngtemplates','usemin']);

};