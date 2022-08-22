const { src, dest, } = require("gulp");
//Плагины
const plumber = require("gulp-plumber"); //поиск проблем
const notify = require("gulp-notify"); //уведомления об ошибках
const autoprefixer = require("gulp-autoprefixer"); //автопрефиксер
const csso = require("gulp-csso"); 
const rename = require("gulp-rename"); 
const groupCssMediaQueries = require("gulp-group-css-media-queries"); 
const webpCss = require("gulp-webp-css");
//Конфигурация
const path = require('../config/path.js');
const app = require('../config/app');



const css = () => {
    return src(path.css.src, { sourcemaps: app.isDev })
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: "CSS",
                message: error.message
            }))
        }))  
        .pipe(webpCss())
        .pipe(autoprefixer())
        .pipe(groupCssMediaQueries())
        .pipe(dest(path.css.dest, { sourcemaps: app.isDev }))
        .pipe(rename({ suffix: ".min"}))
        .pipe(csso())
        .pipe(dest(path.css.dest, { sourcemaps: app.isDev }));
}

module.exports = css;