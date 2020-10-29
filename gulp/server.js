'use strict'; /*jslint node: true */

var gulp = require('gulp');

var browserSync = require('browser-sync');

/* --------------------------------------- */
/* SERVE TASK                              */

/* Task that creates a local server using  */
/* Browsery Sync. If dev/bundle.js or CSS  */
/* changes It will refresh the Browser     */
/* --------------------------------------- */

gulp.task('serve', function () {

  var files = [
     'app/*.html',
     'app/**/*.js',
     'app/*.html',
     'app/css/*.css',
     'app/js/*.*',
     'app/images/*.*',
  ];



	browserSync.init(files, {

      //proxy: "localhost", // use with e.g. mamp

      server: {
         baseDir: './app/'
      },
      port: 1111,

      browser: ["Google Chrome"]
      //tunnel: "buzzradar",


   });

});