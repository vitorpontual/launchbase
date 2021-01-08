const {age, date} = require('../../lib/utils')
const Teacher = require('../models/teacher')


module.exports = {
   async index(request, response){
      let { filter, page, limit } = request.query

      page = page || 1
      limit = limit || 2
      let offset = limit * (page - 1)  

      const params = {
	 filter,
	 page,
	 limit,
	 offset,
      }

      let results = await Teacher.paginate(params)
      const teachers = results.rows

      const pagination = {
	 total: Math.ceil(teachers[0].total / limit),
	 page
      }

	 return response.render('teachers/index', {teachers, filter, pagination})

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
   async post(request, response){
      try{
	 let { avatar_url, name, birth_date, education_level, class_type, subjects_taught } = request.body

	 birth_date = date(birth_date).iso
	 const created_at = date(Date.now()).iso

	 const teacher = await Teacher.create({
	    avatar_url,
	    name,
	    birth_date,
	    education_level,
	    class_type,
	    subjects_taught,
	    created_at
	 })

	 return response.redirect(`/teachers/${teacher}`)
      }catch(err){
	 console.error(err)
      }
   },
   async show(request, response){

      let teacher = await Teacher.find(request.params.id)

      teacher.age = age(teacher.birth_date)
      teacher.subjects_taught = teacher.subjects_taught.split(", ")
      teacher.created_at = date(teacher.created_at).format

      return response.render('teachers/show', {teacher})
   },
   async edit(request, response){
      const id = request.params.id
      let teacher = await Teacher.findOne({where: {id}})
      console.log(teacher)

      teacher.birth_date = date(teacher.birth_date).iso

      return response.render('teachers/edit', {teacher})
   },
   async put(request, response){

      const keys = Object.keys(request.body)

      for(key of keys){
	 if(request.body[key] == '') return response.send('Please, fill all fields')
      }

      let { avatar_url, name, birth_date, education_level, class_type, subjects_taught } = request.body

      console.log(class_type)

      await Teacher.update(request.body.id, {
	 avatar_url,
	 name,
	 birth_date,
	 education_level,
	 class_type,
	 subjects_taught,
      })

      return response.redirect(`/teachers/${request.body.id}`)
   },
   async delete(request, response){
      try{
	 await Teacher.delete(request.body.id)

	 return response.redirect(`/teachers`)
      }catch(err){
	 console.error(err)
      }
    
   }
}
