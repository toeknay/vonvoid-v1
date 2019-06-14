module.exports = function( grunt ) {

    'use strict';

    grunt.initConfig({

        // Compile Sass
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'dist/css/style.css' : 'build/sass/style.scss'
                }
            }
        },

        // Prefix CSS
        postcss: {
            options: {
                processors: [
                    require('autoprefixer')({ browsers: ['last 2 versions', 'Safari < 8'] }),
                    require('postcss-flexbugs-fixes')
                ]
            },
            dist: {
                src: 'dist/css/style.css',
                dest: 'dist/css/style.css'
            }
        },

        // Compile HTML
        bake: {
            build: {
                options: {
                    content: "defaults.json"
                },

                files: [{
                    expand: true,
                    cwd: 'build/html',
                    src: [
                        '**.html',
                        '**/**.html',
                        '!modules/*.html'
                    ],
                    dest: 'dist/'
                }],
            },
        },

        // Compile JS
        uglify: {
            options: {
                sourceMap: true
            },
            build: {
                files: {
                    'dist/js/main.min.js': [
                        'build/js/jquery.min.js',
                        'build/js/vendors/**.js',
                        'build/js/functions.js'
                    ],
                }
            }
        },

        // Compile SVGs
        svgstore: {
            default : {
                files: {
                    'build/img/svgcompile.svg': ['build/img/svgs/*.svg'],
                },
            },
        },

        // Sync Images & Fonts & songs
        sync: {
            main: {
                files: [
                    {
                        cwd: 'build/img',
                        src: ['**'],
                        dest: 'dist/img'
                    },
                    {
                        cwd: 'build/songs',
                        src: ['**'],
                        dest: 'dist/songs'
                    },
                    {
                        cwd: 'build/fonts',
                        src: ['**'],
                        dest: 'dist/fonts'
                    }
                ],
                updateAndDelete: true
            }
        },

        // Watch for file changes
        watch: {
            compass: {
                files: [
                    'build/sass/*.{scss,sass}',
                    'build/sass/**/**.{scss,sass}'
                ],
                tasks:['sass', 'postcss:dist']
            },
            svgstore: {
                files: [
                    'build/img/svgs/*.svg'
                ],
                tasks:['svgstore']
            },
            sync: {
                files: [
                    'build/img/**',
                    'build/songs/**',
                    'build/fonts/**'
                ],
                tasks:['sync']
            },
            bake: {
                files: [
                    'build/html/**',
                    'defaults.json'
                ],
                tasks: ['bake:build']
            },
            uglify: {
                files: [
                    'build/js/**',
                    '!build/js/main.min.js',
                    '!build/js/main.min.js.map'
                ],
                tasks: ['uglify']
            }
        },

        // Reload browser
        browserSync: {
            files: [ 'dist/**'],
            options: {
                server: {
                    baseDir: 'dist',
                    serveStaticOptions: {
                        extensions: ['html']
                    }
                },
                open: true,
                watchTask: true,
                injectChanges: false
            }
        }

    });

    grunt.loadNpmTasks('grunt-bake');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-svgstore');
    grunt.loadNpmTasks('grunt-sync');
    grunt.loadNpmTasks('grunt-browser-sync');

    grunt.registerTask('default', ['sync','sass','postcss:dist','svgstore','bake:build','uglify','browserSync','watch']);
  };
