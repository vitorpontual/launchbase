const { age, date } = require('../../lib/utils')

module.exports = {
   index(request, response){
      return response.render('students/index')
   },
   create(request, reponse){
      return reponse.render('students/create')
   },
   post(request, response){
      const keys = Object.keys(request.body)

      for(key of keys){
	 if(request.body[key] == '') return response.send('Please, fill all fields')
      }
      return
   },
   show(request){
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
