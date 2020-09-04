const fs = require('fs')
const data = require('../data.json')

exports.index = function(request, response) {
   for (recipe of data.recipes){
      recipe.id = data.recipes.indexOf(recipe);

      return response.render("admin/recipes/index", {recipes : data.recipes})
   }
}

exports.create = function(request, response) {
   return response.render('admin/recipes/create')
}

exports.post = function(request, response) {
   const keys = Object.keys(request.body)

   if (request.body[key] = '') {
      return response.send('Please, fill all Fields!')
   }

   data.recipes.push({
      ...request.body
   })

   fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
      if(err) return response.send('Write File Error');
      return response.redirect('admin/recipes')
   })
}
