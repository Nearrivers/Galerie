const path = require("path")
module.exports = {
    entry: "./src/frontend/public/script.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
    },
    devServer: {
        contentBase: "./dist",
    },
}