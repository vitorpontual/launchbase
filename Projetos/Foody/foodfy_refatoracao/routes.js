const express = require("express")
const routes = express.Router()
const main = require("./controllers/main")

routes.get('/', main.index)
routes.get('/about', main.about)
routes.get('/recipes', main.recipes)
routes.get('/recipes/:index', main.recipesIndex)

module.exports = routes
