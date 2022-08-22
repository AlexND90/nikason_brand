const isProd = process.argv.includes("--production");
const isDev = !isProd;

module.exports = {
    isProd: isProd,
    isDev: isDev,

    htmlmin: {
        collapseWhitespace: isProd //сжатие html
    },
    imagemin: {
        verbose: true  //размер изображения до и после
    },
    webpack: {
        mode: isProd ? "production" : "development"
    },
    fonter: {
        formats: ["ttf", "woff", "eot", "svg"]
    },
}