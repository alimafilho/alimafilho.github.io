import gulp from 'gulp';
import plumber from 'gulp-plumber';
import rupture from 'rupture';
import cssnano from 'cssnano';
import gcmq from 'gulp-group-css-media-queries';
import imagemin from 'gulp-imagemin';
import postcss from 'gulp-postcss';
import sourcemaps from 'gulp-sourcemaps';
import stylus from 'gulp-stylus';
import uglify from 'gulp-uglify';
import lost from 'lost';
import poststylus from 'poststylus';
import autoprefixer from 'autoprefixer';
// import browserSync from 'browser-sync';

var browserSync = require('browser-sync').create();

gulp.task('browser-sync', function() {
  browserSync.init({
        // proxy: "http://localhost:3000"
        server: {
            baseDir: "./"
        }
    });
});

const dirs = {
	src:'src',
	dest:'build'
}

gulp.task('styles', ()=> {
	gulp.src('./src/stylus/style.styl')
	.pipe(plumber())
  .pipe(stylus({
    use:[
      poststylus([ autoprefixer({ browsers: ["last 3 version", "> 1%", "ie 8"] })]),
      rupture()
    ]
  }))
  .pipe(postcss([
  	lost(),
  	cssnano()
  ]))
  .pipe(gcmq())
  .pipe(gulp.dest('./build/css'))
});

gulp.task('scripts', ()=> {
  return gulp.src('./src/js/main.js')
  // .pipe(uglify())
  .pipe(gulp.dest('./build/js'))
});

gulp.task('imgoptimizer', ()=> {
  return gulp.src('./src/img/*.{jpg,gif,png,svg}')
  .pipe(plumber())
  .pipe(imagemin({
    optmizationLevel: 5,
    progressive: true,
    interlaced: true
  }))
  .pipe(gulp.dest('./build/images'))
});


gulp.task('watch', ()=> {
  gulp.watch('./src/stylus/*.styl', ['styles', browserSync.reload]);
  gulp.watch('./src/js/*.js', ['scripts', browserSync.reload]);
  gulp.watch('./src/img/*.{jpg,gif,png,svg}', ['imgoptimizer']);
  gulp.watch("./*.html").on('change', browserSync.reload);
});

// gulp.task('default', ['watch','imgoptimizer']);

gulp.task("default", ["watch", "browser-sync"]);