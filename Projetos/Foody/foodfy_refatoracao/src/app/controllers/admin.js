const Recipe = require('../models/recipe')
const { date } = require('../../lib/utils')

exports.index = function(request, response) {
   Recipe.all(function(recipes){
      return response.render('admin/recipes/index', {recipes})

   })
}
exports.show = function(request, response) {
   Recipe.find(request.params.id, function(recipes){
      if(!recipes) return response.send("Recipe not found!")
      recipes.created_at = date(recipes.created_at).format

      return response.render('admin/recipes/show', {recipes})
   })
   
}

exports.create = function(request, response) {
   Recipe.chefSelectOption(function(chefsOption){
      return response.render('admin/recipes/create', {chefsOption})
   
   })
}

exports.post = function(request, response) {

   const keys = Object.keys(request.body)

   for (key of keys){
      if (request.body[key] == '') {
	 return response.send('Please, fill all Fields!')
      }
   }

   Recipe.create(request.body, function(recipes){
      return responseredirect(`/admin/recipes/${recipes.id}`)
   })
   
}

exports.edit = function(request, response){
   Recipe.find(request.params.id, function(recipes){
      if(!recipes) return response.send("Recipe not found!")
      recipes.created_at = date(recipes.created_at).format

      return response.render('admin/recipes/edit', {recipes})
   })
   return
}

exports.put = function(request, response) {
   return
}

exports.delete = function(request, response){
   return
}
