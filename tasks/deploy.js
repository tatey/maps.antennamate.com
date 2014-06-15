/* A grunt task for Lineman that builds and deploys to AWS S3. The task
 * generates gzip files for assets and correctly sets HTTP headers.
 *
 * == Asset Fingerprints
 *
 * This task assumes you have enabled fingerprinting. Enable fingerprinted
 * assets in config/application.js.
 *
 * == Credentials
 *
 * Set the AWS key, secret and bucket in config/credentials.json. This task
 * uses this credentials when making API requests to AWS.
 *
 * == Usage
 *
 * Run this task from the command line:
 *
 *   $ lineman grunt deploy
 */
module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-aws-s3');

  grunt.config.set('compress', {
    dist: {
      options: {
        mode: 'gzip'
      },

      files: [
        {expand: true, cwd: 'dist/', src: '**/*.{css,js,json}', dest: 'dist/'},
      ]
    }
  });

  grunt.config.set('aws_creds', grunt.file.readJSON('config/credentials.json'));
  grunt.config.set('aws_s3', {
    options: {
      accessKeyId: '<%= aws_creds.accessKeyId %>',
      secretAccessKey: '<%= aws_creds.secretAccessKey %>',
      uploadConcurrency: 5
    },

    dist: {
      options: {
        bucket: '<%= aws_creds.bucket %>',
        differential: true
      },

      files: [
        {expand: true, cwd: 'dist/', src: ['**/*', '!**/*.{gz,css,js,png,jpg,jpeg,gif}']},
        {expand: true, cwd: 'dist/', src: '**/*.{css,js,png,jpg,jpeg,gif}', params: {CacheControl: 'max-age=31557600, public'}},
        {expand: true, cwd: 'dist/', src: '**/*.{css,js}.gz', params: {CacheControl: 'max-age=31557600, public', ContentEncoding: 'gzip', ContentType: 'application/x-gzip'}},
        {expand: true, cwd: 'dist/', src: '**/*.gz', params: {ContentEncoding: 'gzip', ContentType: 'application/x-gzip'}}
      ]
    }
  });

  grunt.registerTask('deploy', 'Build and deploy to AWS S3', function() {
    tasks = ['spec-ci', 'dist', 'compress:dist', 'aws_s3:dist'];
    grunt.task.run(tasks);
  });
};
