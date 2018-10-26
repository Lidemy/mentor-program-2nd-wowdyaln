const gulp = require('gulp')
const stylus = require('gulp-stylus')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const cssmin = require('gulp-clean-css')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const rename = require("gulp-rename")
const clean = require('gulp-clean')
const runSequence = require('run-sequence')  // 依序執行 task

gulp.task('css', () => {
 return gulp.src('./src/*.styl')  // 不加 return 執行快很多，奇怪？
    .pipe(stylus())
    .pipe(postcss([autoprefixer()]))
    
    .pipe(gulp.dest('./dest'))
})


gulp.task('js', () => {
  return gulp.src('./src/*.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(gulp.dest('./dest'))
})

gulp.task('minify',[], () => {
  gulp.src('./dest/*.js')
      .pipe(uglify())
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(gulp.dest('./dest'))

  gulp.src('./dest/*.css')
      .pipe(cssmin({
        compatibility: '*',
        keepBreaks: true,
        keepSpecialComments: '*'
      }))
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(gulp.dest('./dest'))
})

gulp.task('clean', () => {
  return gulp.src('./dest')
    .pipe(clean())
})

gulp.task('default', runSequence('clean', 'js', 'css', 'minify'));
