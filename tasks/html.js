const { src, dest, } = require("gulp");
//Плагины
const webpHtml = require("gulp-webp-html"); //добавление webp
const plumber = require("gulp-plumber"); //поиск проблем
const notify = require("gulp-notify"); //уведомления об ошибках
const fileinclude = require("gulp-file-include"); //шаблонизатор
const htmlmin = require("gulp-htmlmin"); //минификация html

//Конфигурация
const path = require('../config/path.js');
const app = require('../config/app');


const html = () => {
    return src(path.html.src)
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: "HTML",
                message: error.message
            }))
        }))
        .pipe(fileinclude())
        .pipe(webpHtml())
        .pipe(htmlmin(app.htmlmin))
        .pipe(dest(path.html.dest))
}

module.exports = html;