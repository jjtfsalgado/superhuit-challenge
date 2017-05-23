module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            my_target: {
              options: {
                  mangle: true
                },
                files: {
                    'js/script.min.js': ['js/script.js']
                } //files
            } //myTarget
        }, //uglify
        compass: {                  // Task
          dist: {                   // Target
            options: {
              require: [['susy'],['breakpoint']],              // Target options
              sassDir: 'sass',
              cssDir: 'css',
              environment: 'production'
            }
          },
          dev: {                    // Another target
            options: {
              require: [['susy'],['breakpoint']],
              sassDir: 'sass',
              cssDir: 'css'
            }
          }
        },
        watch: {
            options: {
              livereload: true
            },
            scripts: {
                files: ['js/script.js'],
                tasks: ['uglify']
            }, //scripts
            html: {
                files: ['**/*.html']
            }, //html
            css: {
                files: '**/*.scss',
      				  tasks: ['compass']
            } //sass
        }, //watch
        link_html: {
          your_target: {
            // Target-specific file lists and/or options go here.
            jsFiles: [['../js/script.min.js'],['../node_modules/jquery/dist/jquery.min.js']],
            cssFiles: [['../css/style.css'],["../css/fonts/fonts.css"]],
            targetHtml: ['../html/index.html'],
            options: {
              cwd: 'public'
            }
          }
        },
        googlefonts: {
          build: {
            options: {
              fontPath: 'fonts/',
              cssFile: 'fonts.css',
              formats: {
                eot: true,
                ttf: true,
                woff: true,
                woff2: true,
                svg: true
              },
              fonts: [
                {
                  family: 'Orbitron',
                  styles: [
                    400, 700
                  ]
                }
              ]
            }
          }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-link-html');
    grunt.loadNpmTasks('grunt-google-fonts');

    // Default task.
    grunt.registerTask('default', ['watch']);
}
