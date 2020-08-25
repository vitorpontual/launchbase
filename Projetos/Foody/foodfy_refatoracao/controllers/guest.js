const fs = require('fs')
const data = require('../data.json')

// Index

exports.index = (request, response) => {
   return response.render('guest/index', {items: data.recipes})
}

// About

exports.about = (request, response) => {
   return response.render("guest/about")
}

// Recipes

exports.recipes = (request, response) => {
   return response.render("guest/recipes", {items: data.recipes})
}

// Details

exports.details = (request, response) => {
   const recipeIndex = request.params.id


   return response.render("guest/details", { items: data.recipes[recipeIndex] })
}

