module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                eqnull: true,
                browser: true,
                globals: {
                    jQuery: false,
                    $: false,
                    console: true
                }
            }
        },
        '<%= pkg.name %>': {
            src: ['app/**/*.js']
        },
        concat: {
            options: {

            },

            dist: {
                src: ['app/js/**/*.js'],
                dest: 'app/js/build/build.js'
            }
        },
        uglify: {
            build: {
                stripBanners: true,
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %> */',
                src: 'app/js/build/build.js',
                dest: 'app/js/build/build.min.js'
            }
        },
        cssmin: {
            with_banner:{
                option:{
                    banner: '/*my minified css*?'
                },
                files:{
                    'app/css/build.min.css': ['app/css/style.css']
                }
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
    grunt.loadNpmTasks('grunt-contrib-jshint')
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('allStaff', ['jshint', 'concat', 'uglify','cssmin',])
    grunt.registerTask('default', ['connect'])

};