const { age, date, grade } = require('../../lib/utils')
const Student = require('../models/student')

module.exports = {
   index(request, response){
      let {filter, page, limit} = request.query

      page = page || 1
      limit = limit || 2
      let offset = limit * (page - 1)

      const params = {
	 filter,
	 page,
	 limit,
	 offset,
	 callback(students){
	    schoolyear = []
	    for ( item of students ){
	       const student = {
		  ...item,
		  grade: grade(item.grade)
	       }
	       schoolyear.push(student)
	    }
	       console.log(schoolyear)
	    pagination = {
	       total: Math.ceil(students[0].total / limit),
	       page
	    } 
	    console.log(pagination)
	    return response.render('students/index', {students :schoolyear, filter, pagination})
	 }
      }

      Student.paginate(params)
   },
   create(request, response){
      Student.teacherSelectOption(function(option){
	 return response.render('students/create', {teacherOption : option})
      })
   },
   post(request, response){
      const keys = Object.keys(request.body)

      for(key of keys){
	 if(request.body[key] == '') return response.send('Please, fill all fields')
      }
      Student.create(request.body, function(student){
	 console.log(student)
	 return response.redirect(`/students/${student.id}`)
      })
   },
   show(request, response){
      Student.find(request.params.id, function(student){
	 if(!student) return response.send('Student Not Found')

	 student.birth_date = date(student.birth_date).birthday
	 student.grade = grade(student.grade)

	 return response.render('students/show', {student})
      })
      return
   },
   edit(request, response){
      Student.find(request.params.id, function(student){
	 if(!student) return response.send('Student not found')

	 student.birth_date = date(student.birth_date).iso
	 Student.teacherSelectOption(function(options){
	    return response.render('students/edit', {student, teacherOption : options })
	 })
	 
      })
   },

   put(request, response){
      const keys = Object.keys(request.body)

      for(key of keys){
	 if(request.body[key] == '') return response.send('Please, fill all fields')
      }

      Student.update(request.body, function(){
	 return response.redirect(`/students/${request.body.id}`)
      })
   },
   delete(request, response){
      Student.delete(request.body.id,  function(){
	 return response.redirect('/students/')
      })
   },
}
