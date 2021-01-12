const express = require('express')
const routes = express.Router()

const teachers = require('../app/controllers/teachers')
const validation = require('../app/validation/user')

routes.get('/', teachers.index)
routes.get('/create', teachers.create)
routes.get('/:id', teachers.show)
routes.get('/:id/edit', teachers.edit)

routes.post('/', validation.post, teachers.post)
routes.put('/', validation.put, teachers.put)
routes.delete('/', teachers.delete)

module.exports = routes
