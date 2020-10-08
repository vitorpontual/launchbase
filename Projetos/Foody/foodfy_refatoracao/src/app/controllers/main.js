const Recipe = require('../models/recipe')
const Chef = require('../models/chef')


exports.index = function(request, response){
   let { filter } = request.query
   if( filter ) {
      Recipe.findBy(filter, function(recipes){
	 return response.render('index', { recipes, filter })
      })
   } else {

      Recipe.all(function(recipes){

	 return response.render('index', {recipes})
   })
   }
}

exports.search = function(request, response){
   let { filter } = request.query

   Recipe.findBy(filter, function(recipes){
      return response.render('search', { recipes, filter })
   })
}

exports.about = (request, response) => {
   return response.render("about")
}

exports.recipes = function (request, response) {
   Recipe.all(function(recipes){
      return response.render('recipes', {recipes})
   })
}
exports.recipesIndex = function (request, response) {
   Recipe.find(request.params.id, function(recipes){
      response.render("details", {recipes})
   })
}

exports.chefs = function(request, response) {
   Chef.all(function(chefs){
      return response.render('chefs', {chefs})
   })
}
