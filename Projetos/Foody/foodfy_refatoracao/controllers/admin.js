const fs = require('fs')
const data = require('../data.json')

exports.index = function(request, response) {
   for (recipe of data.recipes){
      recipe.id = data.recipes.indexOf(recipe);

      return response.render("admin/recipes/index", {recipes : data.recipes})
   }
}
