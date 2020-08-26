const data = require('../data')

exports.index = (request, response) => {
   return response.render("index", { recipes: data.recipes })
}

exports.about = (request, response) => {
   return response.render("about")
}

exports.recipes = (request, response) => {
   return response.render("recipes", { recipes: data.recipes })
}

exports.recipesIndex = (request, response) => {
   const recipe = data.recipes
   const recipeIndex = request.params.index

   return response.render("details", {recipes:recipe[recipeIndex]})
}
