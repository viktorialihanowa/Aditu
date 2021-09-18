// var less = require('gulp-less');
// var path = require('path');

// gulp.task('less', function() {
//     return gulp.src('./less/style.less')
//         .pipe(less({
//             paths: [path.join(__dirname, 'less', 'includes')]
//         }))
//         .pipe(gulp.dest('css'));
// });
"use strict"
var gulp = require("gulp");
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var autoprefixer = require("gulp-autoprefixer");
var server = require("browser-sync").create();


gulp.task("style", function() {
    return gulp.src("./less/style.less")
        .pipe(plumber())
        .pipe(less())
        .pipe(autoprefixer({
            cascade: false
        }))
        // .pipe(autoprefixer())
        .pipe(gulp.dest("css"))
        .pipe(server.stream());
});

// var posthtml = require("gulp-posthtml");
// var include = require("posthtml-include");
// gulp.task("html", function() {
//     return gulp.src("*.html")
//         .pipe(posthtml([include()]))
//         .pipe(gulp.dest("build"));
// })

gulp.task("serve", function() {
    server.init({
        server: ".",
        notify: false,
        open: true,
        cors: true,
        ui: false
    });

    gulp.watch("less/*.less", gulp.parallel("style"));
    gulp.watch("*.html").on("change", server.reload);
});

gulp.task('default', gulp.series('style', 'serve'));