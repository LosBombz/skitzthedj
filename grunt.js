/*global module:false*/
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: '<json:package.json>',
        lint: {
            files: ['<%= pkg.paths.src %><%= pkg.paths.js %>/*.js']
        },
        clean : {
            dist: ['<%= pkg.paths.dist %>']
        },
        copy : {
            dist: {
                files: {
                    '<%= pkg.paths.dist %>/' : '<%= pkg.paths.src %>/index.html',
                    '<%= pkg.paths.dist %>/media/flash/' : '<%= pkg.paths.src %>/media/flash/*',
                    '<%= pkg.paths.dist %>/tracks/' : '<%= pkg.paths.src %>/tracks/*',
                    '<%= pkg.paths.dist %>/images/layout/' : '<%= pkg.paths.src %>/images/layout/*',
                    '<%= pkg.paths.dist %>/images/mixes/' : '<%= pkg.paths.src %>/images/mixes/*',
                    '<%= pkg.paths.dist %>/fonts/' : '<%= pkg.paths.src %>/fonts/*'

                }
            }
        },
        replace: {
            dist :{
                src: ['<%= pkg.paths.dist %>/index.html' ],
                overwrite: true,
                replacements: [{
                    from: '<script data-main="scripts/require.config" src="scripts/components/requirejs/require.js"></script>',
                    to: '<script src="scripts/app-build.js"></script>'
                }]
                
            }
        },
        compass : {
            dev : {
                src: '<%= pkg.paths.src %><%= pkg.paths.sass %>',
                dest: '<%= pkg.paths.src %><%= pkg.paths.css %>',
                linecomments: true,
                forcecompile: true,
                debugsass: true,
                images: '<%= pkg.paths.src %><%= pkg.paths.images %>',
                relativeassets: true
            },
            prod : {
                src: '<%= pkg.paths.src %><%= pkg.paths.sass %>',
                dest: '<%= pkg.paths.dist %><%= pkg.paths.css %>',
                outputstyle: 'compressed',
                linecomments: false,
                forcecompile: true, 
                debugsass: false,
                images: '<%= pkg.paths.src %><%= pkg.paths.images %>',
                relativeassets: true

            }
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: '<%= pkg.paths.src %><%= pkg.paths.js %>',
                    mainConfigFile: '<%= pkg.paths.src %><%= pkg.paths.js %>/require.config.js',
                    name: 'almond',
                    include: ['require.config'],
                    insertRequire : ['require.config'],
                    out: '<%= pkg.paths.dist %><%= pkg.paths.js %>/app-build.js',
                    inlineText: true
                }
            }
        },
        watch: {
            files: ['<%= compass.dev.src %>/*.scss'],
            tasks: ['compass:dev']
        },
        // strip: {

        //     main : {
        //         src : '<%= pkg.paths.dist %><%= pkg.paths.js %>/app-build.js',
        //             options : {
        //             inline : true,
        //             nodes: ['console']
        //         }
        //     }
        
        // },
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
                'require' : true,
                'define' : true,
                'soundManager' : true
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks( 'grunt-strip' );
    grunt.loadNpmTasks( 'grunt-compass' );

    // Default task.
    grunt.registerTask('default', 'copy replace lint requirejs compass:prod');

};
