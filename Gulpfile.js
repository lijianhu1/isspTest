const gulp = require('gulp');
const bs = require('browser-sync').create();//浏览器刷新
const bsReload = bs.reload;
const sass = require('gulp-sass');//sass编译
const cached = require('gulp-cached');//文件修改缓存
const sourcemaps = require('gulp-sourcemaps');//调试sass
const autoprefixer = require('gulp-autoprefixer');//浏览器兼容前缀
const jshint = require('gulp-jshint');//js代码规范检查m
const sassLint = require('gulp-sass-lint');//sass代码规范检查

const svgSymbols = require('gulp-svg-symbols');//svg图标字体
const path = require('path');
const nodemon = require('gulp-nodemon');


gulp.task('sass', ()=> {
    return gulp.src('./public/sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(cached('sass'))//缓存不修改的文件
        .pipe(sass({outputStyle:'expanded'}))
        .pipe(sourcemaps.write({includeContent: true}))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true, //是否美化属性值
            remove:true //是否去掉不必要的前缀
        }))
        .pipe(gulp.dest(__dirname+"/public/css"))
        .pipe(bs.reload({stream: true}));//异步加载样式,不刷新浏览器
});

gulp.task('jshint', ()=> {
    return gulp.src('./public/js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('sasshint', ()=> {
    return gulp.src('sass/**/*.s+(a|c)ss')
        .pipe(sassLint())
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError());
});

gulp.task("svg", ()=>{
    return gulp.src("./public/font-icon/**/*.svg")
        .pipe(svgSymbols({
            transformData:function (svg, defaultData, options) {
                return {
                    id:         defaultData.id,
                    className:  defaultData.className,
                    width:      svg.width + 'px',
                    height:     svg.height + 'px'
                };
            }
        }))
        .pipe(gulp.dest("./public/font/icons"));
});

gulp.task('nodemon',()=>{
   nodemon({
       script:'app.js',
       // 忽略部分对程序运行无影响的文件的改动，nodemon只监视js文件，可用ext项来扩展别的文件类型
       ignore: ["gulpfile.js", "node_modules/"],
       env: { 'NODE_ENV': 'development' }
   }).on('start',function(){
       bs.init({
           proxy:'http://localhost:8888',
           // files: ["public/**/*.*", "koa/**/*.js"],
       },()=>{
           console.log("browser refreshed.");
       })
   })
});

gulp.task('serve', ['sass','nodemon'], ()=> {

    gulp.watch('./public/sass/**/*.scss', ['sass']);
    gulp.watch("./public/html/**/*.html").on('change', bsReload);
    gulp.watch("./public/js/**/*.js").on('change', bsReload);
});

gulp.task('default', ['serve']);

