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
      Teacher.create(req.body, function(teacher){
	 return request.redirect(`/teachers/%{teacher.id}`)
      })
   },
   show(request, response){

      return
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
