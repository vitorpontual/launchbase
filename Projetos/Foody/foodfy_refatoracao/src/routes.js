const express = require("express"):
const routes = express.Router()
const main = require("./app/controllers/main")
const recipes = require("./app/controllers/admin")
const chefs = require('./app/conrollers/chefs')

routes.get('/', main.index)
routes.get('/about', main.about)
routes.get('/recipes', main.recipes)
routes.get('/recipes/:index', main.recipesIndex)

routes.get('/admin/recipes', recipes.index)
routes.get('/admin/recipes/create', recipes.create)
routes.get('/admin/recipes/:id', recipes.show)
routes.get('/admin/recipes/:id/edit', recipes.edit)

routes.post('/admin/recipes', recipes.post)
routes.put('/admin/recipes', recipes.put)
routes.delete('/admin/recipes', recipes.delete)

routes.get('/admin/chefs', recipe.index)

module.exports = routes
