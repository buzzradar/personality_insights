'use strict'; /*jslint node: true */

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();
var cssToJs = require('gulp-css-to-js');
var merge = require('gulp-merge');
var concat = require('gulp-concat');


/* --------------------------------------- */
/* DISTRIBUTE TASK                         */

/* Diferent task that need to be run       */
/* to release a distribution version.      */
/* --------------------------------------- */

gulp.task('distribute', function () {

    console.log(">>>>>>>>>>>>>> DISTRIBUTE TASK <<<<<<<<<<<<<<<<<<<");    
    gulp.start('csstojs');

});


/* --------------------------------------- */
/* CSSTOJS TASK */
/* Turns CSS into JS file                  */                            
/* --------------------------------------- */

gulp.task('csstojs', function () {
  
  console.log("======= > CSS TO JS TASK");  
  var scriptStream = gulp.src('app/dev/assistant_assets/js/BuzzAssistant_min.js');                  /* Get the content of BuzzAssistant.js */
  var styleStream = gulp.src('app/dev/assistant_assets/css/BuzzAssistant.css').pipe(cssToJs());      /* Get the content fo Styles and turn it into JS */
  merge(scriptStream, styleStream)                                            /* Merge both files */
      .pipe(concat('BuzzAssistant_dist.js'))                                   /* Save the File as wizardembed_css.js */
      .pipe(gulp.dest('app/dev/js'));                                           /* Save the file into app/dev folder */

});















