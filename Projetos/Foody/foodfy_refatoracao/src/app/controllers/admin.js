const Recipe = require('../models/recipe')
const File = require('../models/file')
const { date } = require('../../lib/utils')


exports.index = async (request, response) => {
   
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
      return response.render('admin/recipes/index', {recipes, paginate, filter})
   } else {
      const paginate = {
         total: Math.ceil(recipes[0].total/ limit),
         page
      }
      console.log(paginate)
      return response.render('admin/recipes/index', {recipes, paginate, filter})
   }
  
}

exports.show = async (request, response) => {

   
   let results =  await Recipe.find(request.params.id)
   const recipes = results.rows[0]

   if (!recipes) return response.send('Recipe not found!')

   recipes.created_at = date(recipes.created_at).format

   results = await Recipe.files(recipes.id)
   const files = results.rows.map(file => ({
      ...file,
      src: `${request.protocol}://${request.headers.host}${file.path.replace('public', '')}`
   }))

   return response.render('admin/recipes/show', {recipes, files})


}

exports.create = async (request, response) => {
   let results = await Recipe.chefSelectOption()
   const chefsOption = results.rows 
   return response.render('admin/recipes/create', {chefsOption})
}

exports.post = async (request, response) => {

   try {
      const keys = Object.keys(request.body)
      for (key of keys){
         if(request.body[key] == '') return response.send('Please, fill all fields')
      }

      if(request.files.length == 0) return response.send('Please, sent at least one image')

      let results = await Recipe.create(request.body)
      const recipeId = results.rows[0].id

      const filePromise = request.files.map(file => File.createRecipeFiles({
         ...file,
         recipe_id: recipeId
      }))

      console.log(filePromise)
      await Promise.all(filePromise)

      return response.redirect(`/admin/recipes/${recipeId}`)
   } catch(err){
      console.log(`Error => ${err}`)
   }

   
}

exports.edit = async function(request, response){
   let results = await Recipe.find(request.params.id)
   const recipes = results.rows[0]
   
   results = await Recipe.chefSelectOption()
   const option = results.rows

   results = await Recipe.files(recipes.id)
   let files = results.rows
   files = files.map(file => ({
      ...file,
      src: `${request.protocol}://${request.headers.host}${file.path.replace('public', '')}`

   }))
   return response.render('admin/recipes/edit', {chefsOption :option, recipes, files})
}

exports.put = async function(request, response) {
   const keys = Object.keys(request.body)

   for(key of keys){
      if(request.body[key] == ''&& key != 'removed_files') return response.send("Please, fill all fields")
   }

   if (request.files.length != 0) {
      const newFilesPromise = request.files.map(file => {
         File.create({...file, recipe_id: request.body.id})
      })

      await Promise.all(newFilesPromise)
   }


   if (request.body.removed_files) {
      const removedFiles = request.body.removed_files.split(',')
      const lastIndex = removedFiles.length - 1
      removedFiles.splice(lastIndex, 1)

      const removedFilesPromise = removedFiles.map(id => {
         File.delete(id)
      })

      await Promise.all(removedFilesPromise)
   }

   await Recipe.update(request.body)

   return response.redirect(`/admin/recipes/${request.body.id}`)
}

exports.delete = async (request, response) => {
   try {
      await File.delete(request.body.id)
      await Recipe.delete(request.body.id)

      return response.redirect('/admin/recipes')
   } catch(err){
      console.log(err)
   }
}
