var gulp = require('gulp');
const sass = require("gulp-sass");
const rename = require("gulp-rename");
const sassGlob = require("gulp-sass-glob");
const fractal = require("./fractal.js");
const logger = fractal.cli.console;
const cleanCSS = require("gulp-clean-css");


fractal.set('project.title', 'Grid Card Component'); // title for the project
fractal.docs.set('path', `${__dirname}/docs`); // location of the documentation directory.
fractal.components.set('path', `${__dirname}/components`); // location of the component directory.



gulp.task('start', function(){
    const server = fractal.web.server({
        sync: true
    });
    server.on('error', err => logger.error(err.message));
    return server.start().then(() => {
        logger.success(`Fractal server is now running at ${server.url}`);
    });
});



gulp.task('build', function(){
    const builder = fractal.web.builder();
    builder.on('progress', (completed, total) => logger.update(`Exported ${completed} of ${total} items`, 'info'));
    builder.on('error', err => logger.error(err.message));
    return builder.build().then(() => {
        logger.success('Fractal build completed!');
    });
});


gulp.task("images", function() {
    return gulp
      .src(["assets/images/**"], {
        base: "assets/"
      })
  });

gulp.task("scss", function(done) {
gulp.src(["scss/view.scss"])
    .pipe(sassGlob())
    .pipe(sass().on("error", sass.logError))
    .pipe(rename("view.css"))
    .pipe(cleanCSS())
    done();
});

gulp.task('watch', function(){
    gulp.watch("scss/**/*.scss", gulp.series("scss")); 
    gulp.watch("assets/images/**", gulp.series("images")); 
  })
  

gulp.task("build", gulp.parallel("images", "scss", "start"));
gulp.task("watch", gulp.parallel("watch", "start"));