const express = require('express')
const routes = express.Router()

const students = require('../app/controllers/students')
const validation = require('../app/validation/students')

routes.get('/', students.index)
routes.get('/create', students.create)
routes.get('/:id', students.show)
routes.get('/:id/edit', students.edit)

routes.post('/', validation.post, students.post)
routes.put('/',validation.put, students.put)
routes.delete('/', students.delete)

module.exports = routes
