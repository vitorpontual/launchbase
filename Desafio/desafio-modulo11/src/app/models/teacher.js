const db = require('../../config/db')
const Base = require('./Base')
const { age, date } = require('../../lib/utils')

Base.init({table: 'teachers'})

module.exports = {
   ...Base,
   //   paginate(params){
   //      const {filter, limit, offset} = params
   //
   //      let query = "",
   //	 filterQuery = "",
   //	 totalQuery = `(
   //      SELECT count(*) FROM teachers
   //   ) AS total`
   //
   //      if (filter) {
   //	 filterQuery = `
   //	 WHERE teachers.name ILIKE '%${filter}%'
   //	 OR teachers.subjects_taught ILIKE '%${filter}%'
   //	 `
   //
   //	 totalQuery = `(
   //	 SELECT count(*) FROM teachers
   //	 ${filterQuery}
   //	 ) AS total`
   //      }
   //
   //      query = `
   //      SELECT teachers.*, ${totalQuery}, count(students) AS total_students
   //      FROM teachers
   //      LEFT JOIN students ON (teachers.id = students.teacher_id)
   //      ${filterQuery}
   //      GROUP BY teachers.id LIMIT $1 OFFSET $2
   //      `
   //      return db.query(query, [limit, offset])
   //
   //   }
}
