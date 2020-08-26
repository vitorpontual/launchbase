const express = require("express")
const routes = express.Router()
const main = require("./controllers/main")
const recipes = require("./controllers/recipes")

routes.get('/', (request, response) => {
   return response.redirect("/guest")
})

routes.get('/', main.index)
routes.get('/about', main.about)
routes.get('/recipes', main.recipes)
routes.get('/recipes/:index', main.recipesIndex)

module.exports = routes
