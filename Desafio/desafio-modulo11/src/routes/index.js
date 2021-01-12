const express = require('express')
const routes = express.Router()

const students = require('./students')
const teachers = require('./teacher')

routes.get('/', (req, res) => {
   return res.redirect('/teachers')
})

routes.use('/students', students)
routes.use('/teachers', teachers)

module.exports = routes
