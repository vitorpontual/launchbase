const {age, date} = require('../../lib/utils')
const Teacher = require('../models/teacher')


module.exports = {
   async index(request, response){
      let { filter, page, limit } = request.query

      page = page || 1
      limit = limit || 2
      let offset = limit * (page - 1)  

      const search = [
	 'name',
	 'subjects_taught'
      ] 

      const params = {
	 filter,
	 page,
	 limit,
	 offset,
	 search
      }

      let teachers = await Teacher.paginate(params)
      if(teachers == 0){
	 return render.response('teachers/index')
      }

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

	 return response.render('teachers/success')
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
      let { avatar_url, name, birth_date, education_level, class_type, subjects_taught } = request.body


      await Teacher.update(request.body.id, {
	 avatar_url,
	 name,
	 birth_date,
	 education_level,
	 class_type,
	 subjects_taught,
      })

      return response.render('teachers/success')
   },
   async delete(request, response){
      try{
	 await Teacher.delete(request.body.id)

	 return response.render('teachers/delete-teacher')
      }catch(err){
	 console.error(err)
      }
    
   }
}
