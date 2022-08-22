const { watch, series, parallel } = require("gulp");
const browserSync = require("browser-sync").create(); //сервер

//Конфигурация
//Конфигурация
const path = require('./config/path.js');
const app = require('./config/app');

//Подключение задач из tasks
const clear = require('./tasks/clear.js');
const html = require('./tasks/html.js');
const scss = require('./tasks/scss.js');
const js = require('./tasks/js.js');
const img = require('./tasks/img.js');
const font = require('./tasks/font.js');
const css = require('./tasks/css.js');
//Сервер
const server = () => {
    browserSync.init({
        server: {
            baseDir: path.root
        }
    });
}

//Наблюдение
const watcher = () => {
    watch(path.html.watch, html).on("all", browserSync.reload);
    watch(path.scss.watch, scss).on("all", browserSync.reload);
    watch(path.js.watch, js).on("all", browserSync.reload);
    watch(path.img.watch, img).on("all", browserSync.reload);
    watch(path.font.watch, font).on("all", browserSync.reload);
    watch(path.css.watch, css).on("all", browserSync.reload);
}


const build = series(
    clear,
    parallel(html, css, scss, js, img, font),
)

const dev = series(
    build,
    parallel(watcher, server)
)

//Сборка
exports.default = app.isProd
    ? build
    : dev;


//Задачи
exports.html = html;
exports.scss = scss;
exports.js = js;
exports.img = img;
exports.font = font;
exports.css = css;
