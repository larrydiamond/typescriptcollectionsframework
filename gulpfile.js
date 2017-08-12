const gulp = require('gulp');
const ts = require('gulp-typescript');
const jasmine = require('gulp-jasmine');
const clean = require('gulp-clean');
const runSequence = require('run-sequence');
cover = require('gulp-coverage');

gulp.task('build', function() {
    const merge = require('merge2');
    const tsProject = ts.createProject('tsconfig.json');

    var tsResult = tsProject.src()
        .pipe(tsProject());

    return merge([
        tsResult.dts.pipe(gulp.dest('./definitions')),
        tsResult.js.pipe(gulp.dest(tsProject.config.compilerOptions.outDir))
    ]);
});

gulp.task('test:run', function() {
    return gulp.src('dist/spec/**')
                .pipe(cover.instrument({
                    pattern: ['src/**/*.ts'],
                    debugDirectory: 'debug'
                }))
      .pipe(jasmine())
      .pipe(cover.gather())
      .pipe(cover.format({ reporter: 'lcov' }))
      .pipe(gulp.dest('reports'));
});

gulp.task('watch', ['default'], function() {
    gulp.watch('src/*.ts', ['default']);
});

gulp.task('test', [], function(cb) {
  runSequence('build', 'test:run', cb);
});

gulp.task('default', [], function(cb) {
    runSequence('build', cb);
});
