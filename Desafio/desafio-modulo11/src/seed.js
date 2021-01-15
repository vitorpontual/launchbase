const faker = require('faker')
const {age, date} = require('./lib/utils')
const {education_level, grade}= require('./select_option')
const {randomix, type_class} = require('./seed_function') 

const Teacher = require('./app/models/teacher')
const Student = require('./app/models/student')

let totalTeacher = 3
let totalStudents = 6




async function createTeacher(){
   const teacher = []

   while(teacher.length < totalTeacher){
      teacher.push({
	 avatar_url: 'https://source.unsplash.com/collection/430471/500x500',
	 name: faker.name.firstName(),
	 birth_date: date(faker.date.between('1950-01-01', '2000-12-31')).iso,
	 education_level: randomix(4, education_level),
	 class_type: type_class(),
	 subjects_taught: faker.lorem.words(),
	 created_at: date(Date.now()).iso
      })
   }
   const teacherPromise = teacher.map(create => Teacher.create(create))
   teacherId = await Promise.all(teacherPromise)
}

async function createStudent(){
   const student = []
   let results = await Teacher.findAll()

   function teacherRandom(){
      let teacherLength = results.length
      let random = Math.floor(Math.random() * teacherLength)
      let result = results[random].id
      return result
   }

   while(student.length < totalStudents){
      student.push({
	 avatar_url: 'https://source.unsplash.com/collection/430471/500x500',
	 name: faker.name.firstName(),
	 email: faker.internet.email(),
	 birth_date: date(faker.date.between('1980-01-01', '2012-12-31')).iso,
	 grade: randomix(8, grade),
	 weekly: faker.random.number(9),
	 teacher_id: teacherRandom()
      })
   }
   console.log(student)
   const studentPromise = student.map(create => Student.create(create))
   studentIds = await Promise.all(studentPromise)

}

async function init(){
   await createTeacher()
   await createStudent()
}

init()
