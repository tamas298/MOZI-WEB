const path = require("path")

const getIndex = (req, res) => {
    res.render("index", { isIndex : true, title: "Főoldal" })
}

const get404 = (req, res) => {
    res.sendFile('404.html', { root: path.join(__dirname, '../../frontend/views'), title: "404 - Hibás útvonal :(" })
}

module.exports = { getIndex, get404 }