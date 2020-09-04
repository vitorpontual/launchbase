const express = require("express")
const routes = express.Router()
const main = require("./controllers/main")
const recipes = require("./controllers/admin")

routes.get('/', main.index)
routes.get('/about', main.about)
routes.get('/recipes', main.recipes)
routes.get('/recipes/:index', main.recipesIndex)

routes.get('/admin/recipes', recipes.index)
routes.get('/admin/recipes/create', recipes.create)

module.exports = routes
