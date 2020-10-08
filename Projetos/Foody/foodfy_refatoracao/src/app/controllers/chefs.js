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
   const keys = Object.keys(request.body)

   for(key in keys){
      if(request.body[key] == '') return response.send('Please, fill all fields')
   }
   Chef.create(request.body,function(chefs){
      return response.redirect(`/admin/chefs/${chefs.id}`)
   })
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
   Chef.find(request.params.id, function(chefs){
      console.log(chefs)
      if(!chefs) return response.send('Chef not Found')
      return response.render('admin/chefs/edit', {chefs})
   })
}
exports.put = function(request, response){
   const keys = Object.keys(request.body)

   for(key of keys){
      if(request.body[key] == '') return response.send('Please, fill all fields')
   }

   console.log(request.body)
   Chef.update(request.body, function(){
      return response.redirect(`/admin/chefs/${request.body.id}`)
   })
}
exports.delete = function(request, response){
   Chef.delete(request.body.id, function(){
      return response.redirect('/admin/chefs')
   })
}
