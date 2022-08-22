const { src, dest, } = require("gulp");
//Плагины
const plumber = require("gulp-plumber"); //поиск проблем
const notify = require("gulp-notify"); //уведомления об ошибках
const autoprefixer = require("gulp-autoprefixer"); //автопрефиксер
const csso = require("gulp-csso"); 
const rename = require("gulp-rename"); 
const groupCssMediaQueries = require("gulp-group-css-media-queries"); 
const sass = require("gulp-sass")(require("sass")); 
const webpCss = require("gulp-webp-css");
//Конфигурация
const path = require('../config/path.js');
const app = require('../config/app');


const scss = () => {
    return src(path.scss.src, { sourcemaps: app.isDev })
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: "SCSS",
                message:error.message
            }))
        }))  
        .pipe(sass())
        .pipe(webpCss())
        .pipe(autoprefixer())
        .pipe(groupCssMediaQueries())
        .pipe(dest(path.css.dest, { sourcemaps: app.isDev }))
        .pipe(rename({ suffix: ".min"}))
        .pipe(csso())
        .pipe(dest(path.css.dest, { sourcemaps: app.isDev }));
}

module.exports = scss;