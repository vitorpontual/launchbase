const fs = require('fs')
const data = require('../data.json')

exports.index = function(request, response) {
   for (recipe of data.recipes){
      recipe.id = data.recipes.indexOf(recipe);

      return response.render("admin/recipes/index", {recipes : data.recipes})
   }
}

exports.show = function(request, response) {
   for (recipe of data.recipes){
      recipe.id = data.recipes.indexOf(recipe)
   }

   const { id } =  request.params

   const foundRecipe = data.recipes.find(function(recipes){
      return id == recipes.id
   })

   if (!foundRecipe) return response.send('Recipe not Found!!!')

   const recipes = {
      ...foundRecipe
   }

   return response.render('admin/recipes/show', {recipes})
}

exports.create = function(request, response) {
   return response.render('admin/recipes/create')
}

exports.post = function(request, response) {
   const keys = Object.keys(request.body)

   for (key of keys){
      if (request.body[key] == '') {
	 return response.send('Please, fill all Fields!')
      }
   }

   const id = Number(request.body.length + 1)

   data.recipes.push({
      id,
      ...request.body
   })

   fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
      if(err) return response.send('Write file Error!')

      return response.redirect('/admin/recipes')
   })


}

exports.edit = function(request, response){
   for (recipe of data.recipes){
      recipe.id = data.recipes.indexOf(recipe)
   }

   const { id } = request.params

   const foundRecipe = data.recipes.find(function(recipes){
      return id == recipes.id
   })

   if (!foundRecipe) return response.send('Recipe not Found!')

   const recipes = {
      ...foundRecipe
   }

   return response.render('admin/recipes/edit', {recipes})
}

exports.put = function(request, response) {
   const { id } = request.body

   let index = 0

   const foundRecipe = data.recipes.find(function(recipes, foundIndex){
      if(id == recipes.id){
	 index = foundIndex
	 return true
      }
   })

   if (!foundRecipe) return response.send('Recipe not Found!!!')

   const recipe = {
      ...foundRecipe,
      ...request.body,
      id: Number(request.body.id)
   }

   data.recipes[index] = recipe

   fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
      if(err) return response.send("Write file Error")

      return response.redirect(`/admin/recipes/${id}`)
   })
}

exports.delete = function(request, response){
   const { id } = request.body

   const filteredRecipes = data.recipes.filter(function(recipe){
      return recipe.id != id
   })

   data.recipes= filteredRecipes

   fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
      if(err) return response.send('Write file error')
      return response.redirect('/admin/recipes')
   })
}
