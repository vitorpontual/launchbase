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
      return response.redirect(`/admin/recipes/${recipes.id}`)
   })
   
}

exports.edit = function(request, response){
   Recipe.find(request.params.id, function(recipes){
      if(!recipes) return response.send("Recipe not found!")

      recipes.created_at = date(recipes.created_at).format

      Recipe.chefSelectOption(function(option){
	 return response.render('admin/recipes/edit', {recipes, chefsOption: option})
      })
   })
}

exports.put = function(request, response) {
   const keys = Object.keys(request.body)

   for(key of keys){
      if(request.body[key] == '') return response.send("Please, fill all fields")
   }

   Recipe.update(request.body, function(){
      return response.redirect(`/admin/recipes/${request.body.id}`)
   })

}

exports.delete = function(request, response){
   Recipe.delete(request.body.id, function(){
      return response.redirect('/admin/recipes')
   }) 
}
