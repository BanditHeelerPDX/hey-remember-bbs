const { src, dest, watch, series } = require('gulp')
const sass = require('gulp-sass')(require('sass'));

//use .scss as source to compile css rules in .css file
function buildStyles() {
    return src('lib/**/*.scss')
    .pipe(sass())
    .pipe(dest('css'))
}
// watched for changes in .scss files and recompile 
function watchTask() {
    watch(['lib/**/*.scss'], buildStyles)
}
// 'series' runs the functions in order
exports.default = series(buildStyles, watchTask)