const {age, date} = require('../../lib/utils')
const Teacher = require('../models/teacher')


module.exports = {
   index(request, response){
      let { filter, page, limit } = request.query

      page = page || 1
      limit = limit || 2
      let offset = limit * (page - 1)

      const params = {
	 filter,
	 page,
	 offset,
	 callback(teachers){
	    pagination = {
	       total: Math.ceil(teachers[0].total / limit),
	       page
	    }
	    return response.render('teachers/index', {teachers, filter, pagination})
	 }
      }

      Teacher.paginate(params)

      //if(filter){
      //   Teacher.findBy(filter, function(teachers){
      //      return response.render(`teachers/index`, {teachers, filter})
      //   })
      //} else {
      //   Teacher.all(function(teachers){
      //      return response.render("teachers/index", {teachers})
      //   })
      //}
   },
   create(request, response){
      return response.render('teachers/create')
   },
   post(request, response){
      const keys = Object.keys(request.body)
      
      for (key of keys){
	 if(request.body[key] == '') return response.send('Please, fill all fields')
      }
      Teacher.create(request.body, function(teacher){
	 console.log(teacher.id)
	 return response.redirect(`/teachers/${teacher.id}`)
      })
   },
   show(request, response){
      Teacher.find(request.params.id, function(teacher){
	 if(!teacher) return response.send("Teacher not Found!")

	 teacher.age = age(teacher.birth_date)
	 teacher.subjects_taught = teacher.subjects_taught.split(", ")
	 teacher.created_at = date(teacher.created_at).format

	 console.log(teacher.created_at)
	 console.log(teacher.age)
	 return response.render('teachers/show', {teacher})
      })
   },
   edit(request, response){

      Teacher.find(request.params.id, function(teacher){
	 if(!teacher) return response.send('Teacher not found')

	 teacher.birth_date = date(teacher.birth_date).iso

	 return response.render('teachers/edit', {teacher})
      })
   },
   put(request, response){

      const keys = Object.keys(request.body)

      for(key of keys){
	 if(request.body[key] == '') return response.send('Please, fill all fields')
      }
      Teacher.update(request.body, function(){
	 return response.redirect(`/teachers/${request.body.id}`)
      })
   },
   delete(request, response){
      Teacher.delete(request.body.id, function(){
	 return response.redirect(`/teachers/`)
      })
    
   }
}
