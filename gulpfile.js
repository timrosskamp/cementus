'use strict';

// GENERAL
const gulp = require('gulp');
const pump = require('pump');
const concat = require('gulp-concat');

// CSS
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const mqpacker = require('css-mqpacker');
const perfectionist = require('perfectionist');

// JS
const beautify = require('gulp-beautify');

// HTML
const fileInclude = require('gulp-file-include');
const htmlPrettify = require('gulp-html-prettify');

gulp.task('html', function(done){
	pump([
		gulp.src('src/html/pages/*.html'),
		fileInclude({
			prefix: '@@',
			basepath: 'src/html/partials/'
		}),
		htmlPrettify({
			indent_char: ' ',
			indent_size: 4
		}),
		gulp.dest('./')
	], done);
});

gulp.task('sass', function(done){
	pump([
		gulp.src('src/scss/**/*.scss'),
		sassGlob(),
		concat('style.css'),
		sass({
			includePaths: [
				'./node_modules'
			]
		}),
		postcss([
			autoprefixer(),
            mqpacker({
                sort: true,
			}),
			perfectionist({
				colorCase: 'upper',
				colorShorthand: false,
				trimLeadingZero: false,
				zeroLengthNoUnit: true
			})
        ]),
		gulp.dest('assets/css')
	], done);
});

gulp.task('js', function(done){
	pump([
		gulp.src('src/js/*.js'),
		concat('scripts.js'),
		beautify({
			indent_size: 4
		}),
		gulp.dest('assets/js')
	], done);
});

gulp.task('default', function(){
	gulp.watch(['src/scss/**'], { cwd: __dirname }, ['sass']);
	gulp.watch(['src/js/**'], { cwd: __dirname }, ['js']);
	gulp.watch(['src/html/**'], { cwd: __dirname }, ['html']);
});