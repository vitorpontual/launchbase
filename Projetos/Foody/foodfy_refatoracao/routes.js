const express = require("express")
const routes = express.Router()
const guests = require("./controllers/guest")
const admin = require("./controllers/admin")

routes.get('/', (request, response) => {
   return response.redirect("/guest")
})

routes.get("/guest", guests.index)
routes.get("/guest/about", guests.about)
routes.get("/guest/recipes", guests.recipes)
routes.get("/guest/details/:id", guests.details)

routes.get("/admin/recipes", admin.index)
routes.get("/admin/recipes/create", admin.create)
routes.get("/admin/recipes/:id", admin.show)
routes.get("/admin/recipes/:id/edit", admin.edit)

routes.post("/admin/recipes", admin.post)


module.exports = routes
