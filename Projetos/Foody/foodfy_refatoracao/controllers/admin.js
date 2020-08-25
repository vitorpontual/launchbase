const fs = require("fs")
const data = require("../data.json")

// index

exports.index = (request, response) => {
   return response.render('admin/index', { recipes: data.recipes })
}

// Create

exports.create = (request, response) => {
   return response.render('admin/create')
}

// Post

exports.post = (request, response) => {

   const keys = Object.keys(request.body)

   for (key of keys) {
      if (request.body[key] == "") {
	 return response.send('Please, fill all fields')
      }
   }

   let { image, title, author, ingredients, preparation, information } = request.body

   const id = Number(data.recipes.length + 1)

   data.recipes.push({
      id,
      image,
      title,
      author,
      ingredients,
      preparation,
      information,
   })

   fs.writeFile('data.json', JSON.stringify(data, null, 2), err => {
      if(err) {
	 console.log(err)
      }
      return response.redirect("/admin/recipes")
   })
}
   
// show

exports.show = (request, response) => {

   const recipeIndex = request.params.id

   const recipes = {...data.recipes[recipeIndex], id:recipeIndex}

   console.log(recipeIndex)
   console.log(request.params.title)
   console.log(request.params.id)

   return response.render('admin/show', { recipes })
}

// Edit

exports.edit = (request, response) => {
   const recipeIndex = request.params.id

   console.log(recipeIndex)

   return response.render("admin/edit", [{ recipes: data.recipes[recipeIndex]}])



}
