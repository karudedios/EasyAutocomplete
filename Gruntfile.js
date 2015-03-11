module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    project: {
        app: '<%= pkg.name %>',

        js: {
          src: 'src/easy-autocomplete.js',
          dist: 'dist/jquery.easy-autocomplete.min.js'
        },

        sass: {
          src: 'src/sass',
          dist: 'dist'
        }
    },
    
    tag: {
        banner: '/*\n' +
            ' * <%= pkg.name %>\n' +
            ' * <%= pkg.title %>\n' +
            ' * <%= pkg.url %>\n' +
            ' * @author <%= pkg.author %>\n' +
            ' * @version <%= pkg.version %>\n' +
            ' * Copyright <%= pkg.copyright %>. <%= pkg.license %> licensed.\n' +
            ' */\n'
    },
    

    //------------------------ JAVASCRIPT --------------------------

    uglify: {
        dist: {
          files: {
            '<%= project.js.dist %>' : ['<%= project.js.src %>']
          }
        }
    },


    jshint: {
      files: ['Gruntfile.js', 'javascript/module**/*.js', 'javascript/module/navigation**/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    
    //------------------------ CSS --------------------------

    sass: {
     dist: {
       options: {
         style: 'compressed',
         compass: false
       },
       files: [{
        expand: true,
        cwd: '<%= project.sass.src %>',
        src: ['*.scss'],
        dest: '<%= project.sass.dist %>',
        ext: '.min.css'
       }]
     },
    },
    
    
    csslint: {
      options: {
        csslintrc: '.csslintrc'
      },
      src: [
        'dist/css/bootstrap.css',
        'dist/css/bootstrap-theme.css'
      ]
    },



    watch: {
      build: {
        files: 'src/{,*/}*.{scss,js}',
        tasks: ['build']
      }
    }
  });
  
  
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  
  grunt.registerTask('build', ['uglify', 'sass:dist']);
  
  grunt.registerTask('default', ['build']);
};

