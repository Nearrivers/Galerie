const path = require("path")
module.exports = {
    entry: "./src/public/script.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
    },
    devServer: {
        contentBase: "./dist",
    },
}