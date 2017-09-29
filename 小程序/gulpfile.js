const gulp = require('gulp');
const babel = require('gulp-babel');
const replace = require('gulp-replace');
const runSequence = require('run-sequence');

const jsFile = [
	'./lib/**/*.js',
	'./pages/**/*.js',
	'./app.js'
];

const otherFile = [
	'./**/*',
	'!./node_modules',
	'!./node_modules/**/*',
    '!./server',
    '!./server/**/*',
	'!./*.js',
	'!./**/*.js',
	'!./package.json'
];

let jsfile = otherfile = null;

gulp.task('scripts', (cb) => {
	const file = jsfile;
	jsfile = null;

	return gulp.src(file || jsFile, {
			base: './'
		})
		.pipe(babel({
			presets: ['es2015', 'stage-2']
		}))
		.on('error', function(efrr) {
			console.log('scripts',efrr.message,efrr.stack);
			cb && cb();
		})
		.pipe(replace(/(regeneratorRuntime\.\w+)/g, 'global.$1'))
		.pipe(gulp.dest('/release/dbb-dayread/'));

});

gulp.task('otherFile', () => {
	const file = otherfile;
	otherfile = null;

	return gulp.src(file || otherFile, {
		base: './'
	}).pipe(gulp.dest('/release/dbb-dayread/'));
});

gulp.task('default', () => {
	runSequence(['scripts', 'otherFile'], () => {

		console.log('ok');
		console.log('watching file.');

		gulp.watch(jsFile, (e) => {
			console.log(e.path);

			jsfile = e.path;
			runSequence('scripts', () => {
				console.log('keep watching');
			});
		});

		gulp.watch(otherFile, (e) => {
			console.log(e.path);

			otherfile = e.path;
			runSequence('otherFile', () => {
				console.log('keep watching');
			});
		});
	});
});
