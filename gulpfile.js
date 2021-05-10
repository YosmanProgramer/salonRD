'use strict';

const { src, dest, watch } = require('gulp');
const sass = require('gulp-sass');

exports.sass = done => {
  return src('./sass/**/*.scss')
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(dest('./css'));
};

exports.minificar = done => {
  return src('./sass/**/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(dest('./css'));
};

exports.default = done => {
  watch('./sass/**/*.scss', this.sass);
};
