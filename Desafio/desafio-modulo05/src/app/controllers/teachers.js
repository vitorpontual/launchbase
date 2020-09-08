const {age, date} = require('../../lib/utils')
const db = require('../../config/db')

module.exports = {
   index(request, response){
      return response.render('teachers/index')
   },
   create(request, response){
      return response.render('teachers/create')
   },
   post(request, response){
      const keys = Object.keys(request.body)
      
      for (key of keys){
	 if(request.body[key] == '') return response.send('Please, fill all fields')
      }

      const query = `
      INSERT INTO instructors(
	 avatar_url,
	 name,
	 birth_date
	 education_level,
	 class_type,
	 subjects_taught,
	 created_at
      ) VALUE($1, $2, $3, $4, $5, $6, $7)
      RETURNING id
      `
      const values = [
	 request.body.avatar_url,
	 request.body.name,
	 date(request.body.birth_date).iso,
	 request.body.education_level,
	 request.body.class_type,
	 request.body.subjects_taught,
	 date(Date.now()).iso
      ]

      db.query(query, values, (err, results) => {
	 if(err) return response.send('Database error!')

	 return response.redirect(`/teachers/${results.row[0].id}`)
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
