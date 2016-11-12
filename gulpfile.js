// gulpfile.js
const path = require('path');
const gulp = require('gulp');
const concat = require('gulp-concat');
const watch = require('gulp-watch');
const watchPath = require('gulp-watch-path');
const webpackStream = require('webpack-stream');
const named = require('vinyl-named');
const del = require('del');
const browserSync = require('browser-sync').create();
const runSequence = require('run-sequence');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const minifycss = require('gulp-minify-css');
const rename = require('gulp-rename');

// webpack
var webpackConfig = {
    resolve: {
        root: path.join(__dirname, 'node_modules'),
        extensions: ['', '.js', '.vue', '.scss', '.css']
    },
    module: {
        noParse: [/vue.js/],
        loaders: [
            {test: /\.vue$/, loader: 'vue'},
            {test: /\.js$/, loader: 'babel', exclude: /node_modules/},
            {
                test: /\.(png|jpe?g|gif)(\?.*)?$/,
                loader: 'url',
                query: {
                    //limit: 5000,
                    name: 'images/[name].[ext]?[hash:10]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
                loader: 'url',
                query: {
                    //limit: 5000,
                    name: 'fonts/[name].[hash:7].[ext]'
                }
            }
        ]
    },
    plugins: [],
    babel: { //配置babel
        "presets": ["es2015", 'stage-2'],
        "plugins": ["transform-runtime"]
    }
};

// clean, dev, build
gulp.task('clean', function () {
    del(['dist/']);
});
gulp.task('dev', function () {
    runSequence(['static', 'sass', 'es6', 'views'], ['static:watch', 'sass:watch', 'es6:watch', 'views:watch'], function () {
        server();
    });
});
gulp.task('build', function () {
});

// server
function server() {
    browserSync.init({
        startPath: "/",
        files: ["app/**/*.*"],
        server: {
            baseDir: 'app/'
        },
        open: false,
        notify: true
    });
}

// sass
gulp.task('sass', function () {
    compileSass('src/sass/**/*.scss', 'app/css/');
});
gulp.task('sass:watch', function () {
    watch('src/sass/**/*.scss', function (event) {
        compileSass('src/sass/**/*.scss', 'app/css/');
    });
});
function compileSass(srcPath, destPath) {
    gulp.src(srcPath)
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError)) //nested, compact, expanded, compressed
        .pipe(postcss([autoprefixer({browsers: ['last 2 version', '> 10%']})]))
        .pipe(concat('all.css'))
        .pipe(minifycss({
            keepBreaks: true,
            keepSpecialComments: '*'
        }))
        .pipe(gulp.dest(destPath));
}

// es6
gulp.task('es6', function () {
    compileJs('src/es6/*.js', 'app/js/');
});
gulp.task('es6:watch', function () {
    watch(['src/es6/**/*.vue', 'src/es6/*/**/*.js'], function (event) {
        compileJs('src/es6/*.js', 'app/js/');
    });
    watch('src/es6/*.js', function (event) {
        var paths = watchPath(event, 'src/es6/', 'app/js/');
        compileJs(paths.srcPath, paths.distDir);
    });
});
function compileJs(srcPath, destPath) {
    gulp.src(srcPath)
        .pipe(named())
        .pipe(webpackStream(webpackConfig))
        .on('error', function (err) {
            console.error(err);
            this.end()
        })
        .pipe(gulp.dest(destPath));
}

// views
gulp.task('views', function () {
    gulp.src('src/views/**/*.html')
        .pipe(gulp.dest('app/'));
});
gulp.task('views:watch', function () {
    watch('src/views/**/*.html', function (event) {
        var paths = watchPath(event, 'src/views/', 'app/');
        gulp.src(paths.srcPath).pipe(gulp.dest(paths.distDir));
    });
});

// static
gulp.task('static', function () {
    gulp.src(['src/**/*.*', '!src/{es6,sass,views}/**/*.*'])
        .pipe(gulp.dest('app/'));
});
gulp.task('static:watch', function () {
    watch(['src/**/*.*', '!src/{es6,sass,views}/**/*.*'], function (event) {
        var paths = watchPath(event, 'src/', 'app/');
        gulp.src(paths.srcPath)
            .pipe(gulp.dest(paths.distDir));
    });
});