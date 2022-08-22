const { src, dest, } = require("gulp");
//Плагины

const plumber = require("gulp-plumber"); //поиск проблем
const notify = require("gulp-notify"); //уведомления об ошибках
const imagemin = require("gulp-imagemin");
const newer = require("gulp-newer");
const webp = require("gulp-webp");
const gulpif = require("gulp-if");
//Конфигурация
const path = require('../config/path.js');
const app = require('../config/app');


const img = () => {
    return src(path.img.src,)
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: "IMG",
                message: error.message
            }))
        }))
        .pipe(newer(path.img.dest))
        .pipe(webp())
        .pipe(dest(path.img.dest,))
        .pipe(src(path.img.src,))
        .pipe(newer(path.img.dest))
        .pipe(gulpif(app.isProd, imagemin(app.imagemin)))
        .pipe(dest(path.img.dest,));
}
module.exports = img;