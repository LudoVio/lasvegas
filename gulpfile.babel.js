// generated on 2016-02-06 using generator-gulp-webapp 1.1.1
import gulp from 'gulp';
import gutil from 'gulp-util';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import browserify from 'browserify';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import del from 'del';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

gulp.task('styles', () => {
    return gulp.src('app/styles/main.scss')
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.sass.sync({
            outputStyle: 'expanded',
            precision: 10,
            includePaths: ['.']
        }).on('error', $.sass.logError))
        .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
        .pipe($.cssnano({
            discardComments: {removeAll: true},
            autoprefixer: false}))
        .pipe($.sourcemaps.write('./'))
        .pipe(gulp.dest('dist/styles'))
        .pipe(reload({stream: true}));
});

gulp.task('styles-vendor', () => {
    return gulp.src([
        'bower_components/bootstrap/dist/css/bootstrap.min.css',
        'bower_components/bootstrap/dist/css/bootstrap.min.css.map'])
        .pipe($.changed('dist/styles'))
        .pipe(gulp.dest('dist/styles'))
});

gulp.task('scripts', () => {
    var b = browserify({
        entries: 'app/scripts/main.js',
        debug: true
    });

    return b.bundle()
        .on('error', (e) => {
            gutil.log(e);
        })
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe($.plumber())
        .pipe($.sourcemaps.init({loadMaps: true}))
        .pipe($.uglify())
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest('dist/scripts'))
        .pipe(reload({stream: true}));
});

gulp.task('scripts-vendor', () => {
    return gulp.src([
            'bower_components/jquery/dist/jquery.min.js',
            'bower_components/jquery/dist/jquery.min.js.map',
            'bower_components/knockout/dist/knockout.js',
            'bower_components/bootstrap/dist/js/bootstrap.min.js'])
        .pipe($.changed('dist/scripts/vendor'))
        .pipe(gulp.dest('dist/scripts/vendor'))
});

function lint(files, options) {
    return () => {
        return gulp.src(files)
            .pipe(reload({stream: true, once: true}))
            .pipe($.eslint(options))
            .pipe($.eslint.format())
            .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
    };
}

gulp.task('lint', lint('app/scripts/**/*.js'));

gulp.task('html', () => {
    return gulp.src('app/index.html')
        .pipe($.htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'))
        .pipe(reload({stream: true}));;
});

gulp.task('images', () => {
    return gulp.src('app/images/**/*')
        .pipe($.if($.if.isFile, $.cache($.imagemin({
                progressive: true,
                interlaced: true,
                // don't remove IDs from SVGs, they are often used
                // as hooks for embedding and styling
                svgoPlugins: [{cleanupIDs: false}]
            }))
            .on('error', function (err) {
                console.log(err);
                this.end();
            })))
        .pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', () => {
    return gulp.src(require('main-bower-files')('**/*.{eot,svg,ttf,woff,woff2}', function (err) {
        })
        .concat('app/fonts/**/*'))
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('extras', () => {
    return gulp.src([
        'app/*.*',
        '!app/*.html'
    ], {
        dot: true
    }).pipe(gulp.dest('dist'));
});

gulp.task('clean', del.bind(null, 'dist'));

gulp.task('serve', ['build'], () => {
    browserSync({
        notify: false,
        port: 9000,
        server: {
            baseDir: ['dist']
        }
    });

    gulp.watch('app/index.html', ['html']);
    gulp.watch('app/styles/main.scss', ['styles']);
    gulp.watch('app/scripts/**/*', ['scripts']);
    gulp.watch('app/images/**/*', ['images']);
    gulp.watch('bower.json', ['fonts']);
    gulp.watch(['app/*.*', '!app/*.html'], ['extras']);
});

gulp.task('build', ['html', 'styles', 'styles-vendor', 'scripts', 'scripts-vendor', 'images', 'fonts', 'extras'], () => {
    return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], () => {
    gulp.start('build');
});
