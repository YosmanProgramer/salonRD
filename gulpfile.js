'use strict';

const { src, dest, watch } = require('gulp');
const sass = require('gulp-sass');
const minifyJs = require('gulp-uglify');

exports.sass = done => {
  return src('./sass/**/*.scss')
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(dest('./css'));
};

exports.minificarCss = done => {
  return src('./sass/**/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(dest('./css'));
};

exports.minificarJs = done => {
  return src('./js/**/*.js').pipe(minifyJs()).pipe(dest('./js'));
};

exports.default = done => {
  watch('./sass/**/*.scss', this.sass);
};
