const { src, dest, } = require("gulp");
//Плагины
const plumber = require("gulp-plumber"); //поиск проблем
const notify = require("gulp-notify"); //уведомления об ошибках
const babel = require("gulp-babel");
const webpack = require("webpack-stream");

//Конфигурация
const path = require('../config/path.js');
const app = require('../config/app');


const js = () => {
    return src(path.js.src, { sourcemaps: app.isDev })
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: "JavaScript",
                message: error.message
            }))
        }))
        .pipe(babel()) 
        .pipe(webpack(app.webpack))
        .pipe(dest(path.js.dest, { sourcemaps: app.isDev }));
}

module.exports = js;