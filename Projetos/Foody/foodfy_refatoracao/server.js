const express = require('express')
const nunjucks = require('nunjucks')

const recipe = require('./data')
const server = express()

server.use(express.static('public'))

server.set('view engine', 'njk')

nunjucks.configure('views', {
    express: server,
    autoescape: false,
    noCache: true
})


server.get('/', (req, res) => {
    return res.render('index', {items: recipe})
})

server.get('/about', (req, res) => res.render('about'))

server.get('/recipes', (req, res) => {
    return res.render('recipes', {items : recipe})
})

server.get('/details/:id', (req, res) => {

    const recipeIndex = req.params.id
    console.log(req.params)
    console.log(recipeIndex)    
    console.log(recipe[recipeIndex])

    return res.render('details', {items : recipe[recipeIndex]})
})




server.listen(5000, function(){
    console.log('Foodfy server is Running...')
})