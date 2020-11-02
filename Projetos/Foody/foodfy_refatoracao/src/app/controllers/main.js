const Recipe = require('../models/recipe')
const Chef = require('../models/chef')
const file = require('../models/file')


exports.index = async function(request, response){
   let { filter } = request.query

   if( filter ) {
      let results = await Recipe.findBy(filter)
      const allRecipes = results.rows

      let recipes = []

      allRecipes.map(recipe => {
         recipes.push({
            id: recipe.id,
            title: recipe.title,
            chef_name: recipe.chef_name,
            image: recipe.array[0].replace('public', '')
         })
      })

      console.log(recipes)

      return response.render('general/index', {recipes, filters})
   } else {

      let results = await Recipe.all()
      const allRecipes = results.rows


      let recipes = []

      allRecipes.map(recipe => {
         const { file_path, title, chefs_name } = recipe

         console.log(recipe)
         recipes.push({
            id: recipe.id,
            title,
            chefs_name,
            image: `${request.protocol}://${request.headers.host}${file_path[0].replace('public', '')}` 
         })
      })

      console.log(recipes)
      return response.render('general/index', {recipes})
   }
}

exports.search = async function(request, response){
   let { filter } = request.query
   let results = await Recipe.findBy(filter)
   const allRecipes = results.rows

   recipes = []

   results = await allRecipes.map(recipe => {
      let {file_path} = recipe
      recipes.push({
         ...recipe,
         image: `${request.protocol}://${request.headers.host}${file_path.replace('public','')}`
      })
   })


   return response.render('general/search', {recipes, filter})
}

exports.about = (request, response) => {
   return response.render("general/about")
}

exports.recipes = async function (request, response) {
   let { filter, page, limit} = request.query


   page = page || 1
   limit = limit || 6
   let offset = limit * (page - 1)

   const params = {
      filter, 
      page,
      limit,
      offset,
   }
   
   let results = await Recipe.pagination(params)
   const allRecipes = results.rows

   recipes = []

   allRecipes.map(recipe => {
      const {array} = recipe
      recipes.push({
         ...recipe,         
         image: `${request.protocol}://${request.headers.host}${array[0].replace('public', '')}` 
      })
   })

   console.log(recipes)

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
      return response.render('general/recipes', {recipes, paginate, filter})
   }
}
exports.recipesIndex = async function (request, response) {
   let results = await Recipe.find(request.params.id)
   const recipes = results.rows[0]

   if(!recipes) return response.send('Recipe not found')

   results = await Recipe.files(recipes.id)
   const files = results.rows.map(file => ({
      ...file,
      src: `${request.protocol}://${request.headers.host}${file.path.replace('public','')}`
   }))
  
   return response.render('general/details', {recipes, files})
}

exports.chefs = async function(request, response) {
   let results = await Chef.all()
   const chefs = results.rows


   return response.render('general/chefs', {chefs})
  
}
