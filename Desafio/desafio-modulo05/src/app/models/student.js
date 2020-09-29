const db = require('../../config/db')
const { age, date } = require('../../lib/utils')

module.exports = {
   all(callback){
      db.query(`
      SELECT students.* FROM students
      `, function(err, results){
	 if(err) throw `Database Error! ${err}`

	 callback(results.rows)
      })
   },
   create(data, callback){
      const query = `
      INSERT INTO students (
      avatar_url,
      name,
      email,
      birth_date,
      grade,
      weekly,
      teacher_id
      ) VALUES ($1,$2,$3,$4,$5,$6,$7)
      RETURNING id
      `

      const values = [
	 data.avatar_url,
	 data.name,
	 data.email,
	 data.birth_date,
	 data.grade,
	 data.weekly,
	 data.teacher
      ]

      console.log(data.grade)
      db.query(query, values, function(err, results){
	 if(err) throw `Database Error! ${err}`

	 callback(results.rows[0])
      })
   },
   teacherSelectOption(callback){
      db.query(`SELECT name, id FROM teachers`, function(err, results){
	 if(err) throw `Database Error! ${err}`

	 callback(results.rows)
      })
   },
   find(id, callback){
      db.query(`
      SELECT students.*, teachers.name AS teacher_name
      FROM students
      LEFT JOIN teachers ON (students.teacher_id = teachers.id)
      WHERE students.id = $1
      `, [id], function(err, results){
	 if(err) throw `Database Error! ${err}`

	 callback(results.rows[0])
      })
   }
}


