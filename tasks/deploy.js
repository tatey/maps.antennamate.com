module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-aws');

  grunt.config.set('s3', {
    options: grunt.file.readJSON('config/credentials.json'),

    main: {
      cwd: 'dist/',
      src: ['**/*', '!**/*.{css,js,png,jpg,jpeg,gif}']
    },

    assets: {
      cwd: 'dist/',
      src: '**/*.{css,js,png,jpg,jpeg,gif}',
      headers: {
        CacheControl: 31557600 // 1 year
      }
    }
  });

  grunt.registerTask('deploy', 'Build and deploy to AWS S3', function() {
    tasks = ['spec-ci', 'dist', 's3:main', 's3:assets'];
    grunt.task.run(tasks);
  });
};
