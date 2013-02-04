/*global module:false*/
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: '<json:package.json>',
        lint: {
            files: ['<%= pkg.paths.src %>' + '<%= pkg.paths.js %>' + '/*.js']
        },
        compass : {
            dev : {
                src: '<%= pkg.paths.src %>' + '<%= pkg.paths.sass %>',
                dest: '<%= pkg.paths.src %>' + '<%= pkg.paths.css %>',
                linecomments: true,
                forcecompile: true,
                debugsass: true,
                images: '<%= pkg.paths.src %>' + '<%= pkg.paths.images %>',
                relativeassets: true
            },
            prod : {
                src: '<%= pkg.paths.src %>' + '<%= pkg.paths.sass %>',
                dest: '<%= pkg.paths.dest %>' + '<%= pkg.paths.css %>',
                outputstyle: 'compressed',
                linecomments: false,
                forcecompile: true,
                debugsass: false,
                images: '<%= pkg.paths.src %>' + '<%= pkg.paths.images %>',
                relativeassets: true

            }
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: '<%= pkg.paths.src %>' + '<%= pkg.paths.js %>',
                    mainConfigFile: '<%= pkg.paths.src %>' + '<%= pkg.paths.js %>' + '/config.js',
                    out: '<%= pkg.paths.dist %>' + '<%= pkg.paths.js %>' + '/min.js'
                }
            }
        },
        watch: {
            files: ['grunt.js','<%= pkg.paths.src %>' + '<%= pkg.paths.sass %>' + '/**/*.scss'],
            tasks: ['compass:dev']
        },
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
                boss: true,
                eqnull: true,
                browser: true
            },
            globals: {
                '$' : true,
                '_' : true,
                'Backbone' : true,
                'require' : true,
                'define' : true,
                'soundManager' : true,
                'console' : true
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks( 'grunt-compass' );

    // Default task.
    grunt.registerTask('default', 'lint requirejs compass:prod');

};
