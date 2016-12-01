'use strict';

const gulp = require('gulp'),
	pug = require('gulp-pug'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync'),
	watch = require('gulp-watch'),
	autoprefixer = require('gulp-autoprefixer'),

	path = {
		src: {
			pug: 'src/pug/*.pug',
			style: 'src/assets/style/main.scss',
			js:'src/assets/js/*.js',
			img: 'src/img/*.*',
		},
		dist: {
			html: 'dist',
			css: 'dist/assets/css/',
			js: 'dist/assets/js',
			img: 'dist/assets/img/',
		},
	};

//Server
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: "dist"
    },
    port: 8080,
    open: true,
    notify: false
  });
});

//html
gulp.task('pug:build', function() {
  var YOUR_LOCALS = {};

  gulp.src(path.src.pug)
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest(path.dist.html))
    .pipe(browserSync.reload({stream: true}));
});

//style
gulp.task('sass:build', function(){
   return gulp.src(path.src.style)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 10'], { cascade: true }))
    .pipe(gulp.dest(path.dist.css))
    .pipe(browserSync.reload({stream:true}));
});

//img
gulp.task('img:build', function () {
	gulp.src(path.src.img)
		.pipe(gulp.dest(path.dist.img))
		.pipe(browserSync.reload({stream: true}));
});

//js
gulp.task('js:build', function () {
	gulp.src(path.src.js)
		.pipe(gulp.dest(path.dist.js))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('sass:watch', function () {
  gulp.watch('src/style/**/*.scss',['sass:build']);
});

gulp.task('pug:watch', function () {
  gulp.watch(path.src.pug,['pug:build']);
});


gulp.task('build', [
	'pug:build',
	'sass:build',
	'img:build',
	'js:build',
]);

gulp.task('watch', [
	'pug:watch',
	'sass:watch',
	]);

gulp.task('default', [
	'browserSync',
	'build',
	'watch',
	]);
