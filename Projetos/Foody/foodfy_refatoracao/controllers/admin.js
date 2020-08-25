const fs = require("fs")
const data = require("../data.json")

// index

exports.index = (request, response) => {
   return response.render('admin/index', { recipes: data.recipes })
}

// show

exports.show = (request, response) => {

   const recipeIndex = request.params.id

   console.log(recipeIndex)
   console.log(request.params.title)
   console.log(request.params.id)

   return response.render('admin/show', { recipes : data.recipes[recipeIndex] })
}

// Edit

exports.edit = (request, response) => {
   const recipeIndex = request.params.id

   console.log(recipeIndex)

   return response.render("admin/edit", [{ recipes: data.recipes[recipeIndex]}])



}
