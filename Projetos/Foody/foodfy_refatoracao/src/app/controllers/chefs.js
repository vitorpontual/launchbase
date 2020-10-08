const Chef = require('../models/chef')

exports.index = function(request, response){
   Chef.all(function(chefs){
      return response.render('admin/chefs/index', { chefs })
   })
}
exports.create  = function(request, response){
   return response.render('admin/chefs/create')
}
exports.post = function(request, response){
   return
}
exports.show = function(request, response){
   Chef.find(request.params.id, function(chefs){
      if(!chefs) return response.send('Chef not found')
      Chef.findRecipesChef(request.params.id, function(recipes){
	 return response.render('admin/chefs/show', {chefs, recipesChefs: recipes})
      })

   })
}
exports.edit = function(request, response){
   return
}
exports.put = function(request, response){
   return
}
exports.delete = function(request, response){
   return
}
