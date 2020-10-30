const Recipe = require('../models/recipe')
const Chef = require('../models/chef')


exports.index = async function(request, response){
   let { filter } = request.query

   if( filter ) {
      let results = await Recipe.findBy(filter)
      const recipes = results.rows

      return response.render('general/index', {recipes, filters})
   } else {

      let results = await Recipe.all()
      const recipes = results.rows
      return response.render('general/index', {recipes})
   }
}

exports.search = async function(request, response){
   let { filter } = request.query
   let results = await Recipe.findBy(filter)
   const recipes = results.rows

   return response.render('general/search', {recipes, fitler})
}

exports.about = (request, response) => {
   return response.render("general/about")
}

exports.recipes = async function (request, response) {
   let { filter, page, limit} = request.query


   page = page || 1
   limit = limit || 4
   let offset = limit * (page - 1)

   const params = {
      filter, 
      page,
      limit,
      offset,
   }
   
   let results = await Recipe.pagination(params)
   const recipes = results.rows
   if( recipes == ''){
      const paginate = {
         page
      }
      return response.render('general/recipes', {recipes, paginate, filter})
   } else {
      const paginate = {
         total: Math.ceil(recipes[0].total/ limit),
         page
      }
      console.log(paginate)
      return response.render('general/recipes', {recipes, paginate, filter})
   }
}
exports.recipesIndex = async function (request, response) {
   let results = await Recipe.find(request.params.id)
   const recipes = results.rows[0]

   return response.render('general/details', {recipes})
}

exports.chefs = function(request, response) {
   Chef.all(function(chefs){
      return response.render('general/chefs', {chefs})
   })
}
