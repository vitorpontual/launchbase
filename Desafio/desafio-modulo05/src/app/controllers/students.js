const { age, date } = require('../../lib/utils')
const Student = require('../models/student')

module.exports = {
   index(request, response){
      Student.all(function(students){
	 return response.render('students/index', {students})
      })
   },
   create(request, response){
      Student.teacherSelectOption(function(option){
	 return response.render('students/create', {option})
      })
   },
   post(request, response){
      const keys = Object.keys(request.body)

      for(key of keys){
	 if(request.body[key] == '') return response.send('Please, fill all fields')
      }
      Student.create(request.body, function(student){
	 return response.render(`students/${student.id}`, {student})
      })
   },
   show(request, response){
      Student.find(request.params.id, function(student){
	 if(!student) return response.send('Student Not Found')

	 console.log(student.birth_date)
	 student.birth_date = date(student.birth_date).birthday
	 console.log(student.birth_date)
	 return response.render('students/show', {student})
      })
      return
   },
   edit(request){
      return
   },
   put(request){
      const keys = Object.keys(request.body)

      for(key of keys){
	 if(request.body[key] == '') return response.send('Please, fill all fields')
      }

   },
   delete(request){
      return
   },
}
