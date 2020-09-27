const {age, date} = require('../../lib/utils')
const Teacher = require('../models/teacher')


module.exports = {
   index(request, response){
      Teacher.all(function(teachers){
	 return response.render('teachers/index', {teachers})
      })
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

      return
   },
   put(request, response){

      const keys = Objects.keys(request.body)

      for(key of keys){
	 if(!request.body[key] == '') return response.send('Please, fill all fields')
      }
      return
   },
   delete(request, response){
    
      return
   }
}
