const { age, date, grade } = require('../../lib/utils')
const Student = require('../models/student')
const Teacher = require('../models/teacher')

module.exports = {
   async index(request, response){
      let {filter, page, limit} = request.query

      page = page || 1
      limit = limit || 2
      let offset = limit * (page - 1)

      const search = ['name', 'email']
      const params = {
	 filter,
	 page,
	 limit,
	 offset,
	 search
      }

      let students = await Student.paginate(params)

      let schoolyear = []
      for ( item of students ){
	 const student = {
	    ...item,
	    grade: grade(item.grade)
	 }
	 schoolyear.push(student)
      }
      pagination = {
	 total: Math.ceil(students[0].total / limit),
	 page
      }
      return response.render('students/index', {students :schoolyear, filter, pagination})

   },
   async create(request, response){
      const teacherOption = await Teacher.findAll()
      return response.render('students/create', {teacherOption})
   },
   async post(request, response){
      try{
	 let {avatar_url, name, email, birth_date, grade, weekly, teacher} = request.body

	 const student = await Student.create({
	    avatar_url,
	    name,
	    email,
	    birth_date,
	    grade,
	    weekly,
	    teacher_id: teacher
	 })

	 return response.redirect(`/students/${student}`)
      }catch(err){
	 console.error(err)
      }
   },
   async show(request, response){
      try{
	 const student = await Student.find(request.params.id)
	 student.birth_date = date(student.birth_date).birthday
	 student.grade = grade(student.grade)

	 const teacher = await Teacher.find(student.teacher_id)
	 student.teacher_name = teacher.name

	 return response.render('students/show', {student})
      }catch(err){
	 console.error(err)
      }
   },
   async edit(request, response){
      try{
	 const id = request.params.id
	 const student = await Student.findOne({where: {id}})
	 const teacherOption = await Teacher.findAll()

	 student.birth_date = date(student.birth_date).iso

	 return response.render('students/edit', {student, teacherOption})
      }catch(err){
	 console.error(err)
      }
   },

   async put(request, response){
      try{
	 let {avatar_url, name, email, birth_date, grade, weekly, teacher} = request.body

	 date(birth_date).iso
	 console.log(request.body)

	 await Student.update(request.body.id, {
	    avatar_url,
	    name,
	    email,
	    birth_date,
	    grade,
	    weekly,
	    teacher_id: teacher
	 })

	 return response.redirect(`/students/${request.body.id}`)

      }catch(err){
	 console.error(err)
      }
   },
   async delete(request, response){
      try{
	 await Student.delete(request.body.id)

	 return response.redirect('/students')
      }catch(err){
	 console.error(err)
      }
   },
}
