const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const rename = require("gulp-rename");
const cleanCss = require("gulp-clean-css");
const babel = require("gulp-babel");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const sourceMaps = require("gulp-sourcemaps");
const autoprefixer = require("gulp-autoprefixer");
const imagemin = require("gulp-imagemin");
const size = require('gulp-size');
const newer = require('gulp-newer');
const gulpPug = require('gulp-pug');
const browserSync = require('browser-sync').create();
const del = require("del");

const paths = {
    pug: {
        src: "src/*.pug",
        dest: "build/",
    },
    styles: {
        src: "src/scss/**/*.scss",
        dest: "build/css/",
    },
    css: {
        src: "src/css/**/*.css",
        dest: "build/css/",
    },
    scripts: {
        src: [
            "src/js/**/*.js",
        ],
        dest: "build/js/",
    },
    favicon: {
        src: "src/favicon.ico",
        dest: "build/",
    },
    images: {
        src: "src/images/**",
        dest: "build/images/",
    },
    fonts: {
        src: "src/resources/fonts/**",
        dest: "build/resources/fonts/",
    },
};

function clean() {
    return del(["build/*", "!build/images"]);
}

function css() {
    return gulp
        .src(paths.css.src)
        .pipe(gulp.dest(paths.css.dest))
}

function favicon() {
    return gulp
        .src(paths.favicon.src)
        .pipe(gulp.dest(paths.favicon.dest));
}

function styles() {
    return gulp
        .src(paths.styles.src)
        .pipe(sourceMaps.init())
        // .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
        .pipe(sass({ outputStyle: "expanded" }).on("error", sass.logError))
        .pipe(autoprefixer({ cascade: false, }))
        // .pipe(cleanCss({ level: 2, }))
        .pipe(rename({ basename: "main", suffix: ".min", }))
        .pipe(sourceMaps.write("."))
        .pipe(size({showFiles: true}))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.stream());
}

function fonts() {
    return gulp
        .src(paths.fonts.src)
        .pipe(gulp.dest(paths.fonts.dest))
        .pipe(browserSync.stream());
}

function image() {
    return gulp
        .src(paths.images.src)
        .pipe(newer(paths.images.dest))
        .pipe(imagemin({ progressive: true }))
        .pipe(size({showFiles: true}))
        .pipe(gulp.dest(paths.images.dest));
}

function scripts() {
    return gulp
        .src(paths.scripts.src)
        .pipe(sourceMaps.init())
        .pipe(
            babel({
                presets: ["@babel/env"],
            })
        )
        .pipe(uglify())
        // .pipe(concat("main.min.js"))
        .pipe(sourceMaps.write("."))
        .pipe(size({showFiles: true}))
        .pipe(gulp.dest(paths.scripts.dest))
        .pipe(browserSync.stream());
}

function pug() {
    return gulp.src(paths.pug.src)
        .pipe(gulpPug({
            pretty: true,
        }))
        .pipe(size({showFiles: true}))
        .pipe(gulp.dest(paths.pug.dest))
        .pipe(browserSync.stream());
}

function watch() {
    browserSync.init({
        server: {
            baseDir: "./build/"
        }
    })
    gulp.watch(paths.pug.src, pug);
    gulp.watch(paths.pug.dest).on('change', browserSync.reload);
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.scripts.src, scripts);
    gulp.watch(paths.images.src, image);
}

const build = gulp.series(clean, pug, gulp.parallel(styles, css, scripts, image, favicon, fonts), watch);

exports.clean = clean;
exports.image = image;
exports.favicon = favicon;
exports.pug = pug;
exports.styles = styles;
exports.scripts = scripts;
exports.watch = watch;
exports.build = build;
exports.default = build;
