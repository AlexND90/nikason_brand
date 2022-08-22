const del = require("del");
//Удаление
//Конфигурация
const path = require('../config/path.js')

const clear = () => {
    return del(path.root);
}

module.exports = clear;
