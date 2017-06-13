var gulp = require('gulp');
var gutil = require('gutil');
var nunjucksRender = require("gulp-nunjucks-render");
var data = require('gulp-data');
var htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');

gulp.task('minify', function() {
  return gulp.src('./public/index.html')
    .pipe(htmlmin({collapseWhitespace:true,minifyJS:true}))
    .pipe(gulp.dest('public'));
});

gulp.task('nunjucks', function() {
  return gulp.src('views/pages/**/*.njk')
    .pipe(data(function() {
      return require('./views/data/data.json')
    }))
	.pipe(nunjucksRender({
      path: ['views/templates']
    }))
	.pipe(gulp.dest('./public'))
});

gulp.task('uglify', function() {
  return gulp.src('public/app/js/lib/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('public/app/js/lib'))
});




