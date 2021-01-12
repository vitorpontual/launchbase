const db = require('../../config/db')

function find(filters, table){
   let query = `SELECT * FROM ${table}`

   if(filters){
      Object.keys(filters).map(key => {
	 query += ` ${key}`

	 Object.keys(filters[key]).map(field => {
	    query += ` ${field} = '${filters[key][field]}'`
	 })
      })
   }

   return db.query(query)
}

const Base = {
   init({table}){
      if(!table) throw new Error('Invalide Params')

      this.table = table

      return this
   },
   async findAll(filters){
      const results = await find(filters, this.table)

      return results.rows
   },
   async findOne(filters){
      const results = await find(filters, this.table)
      return results.rows[0]
   },
   async find(id){
      const results = await find({where: {id}}, this.table)
      return results.rows[0]
   },
   async create(fields){
      try{
	 let keys = [],
	    values = []

	 Object.keys(fields).map(key => {
	    keys.push(key)
	    values.push(`'${fields[key]}'`)
	 })

	 const query = `INSERT INTO ${this.table} (${keys.join(',')})
	 VALUES (${values.join(',')})
	 RETURNING id
	 `
	 const results = await db.query(query)
	 return results.rows[0].id
      }catch(err){
	 console.error(err)
      }
   },
   async update(id, fields){
      try{
	 let update = []

	 Object.keys(fields).map(key => {
	    const line = `${key} = '${fields[key]}'`
	    update.push(line)
	 })

	 let query = `UPDATE ${this.table} SET 
	 ${update.join(',')} WHERE id = ${id}`

	 console.log(query)

	 await db.query(query)
	 return
      }catch(err){
	 console.error(err)
      }
   },
   async delete(id){
      return db.query(`DELETE FROM ${this.table} WHERE id = $1`, [id])
   },
   async paginate(params){
      try{
	 const {filter, limit, offset, search} = params

	 let query = '',
	    filterQuery = '',
	    totalQuery = `(SELECT count(*) FROM ${this.table}) AS total`


	 if(filter){
	    filterQuery = `
	    WHERE ${this.table}.${search[0]} ILIKE '%${filter}%'
	    OR ${this.table}.${search[1]} ILIKE '%${filter}%'
	    `
	    totalQuery = `(
	    SELECT count(*) FROM ${this.table}
	    ${filterQuery}
	    ) AS total`
	 }
	 if(this.table == 'teachers'){
	    query = `
	    SELECT ${this.table}.*, ${totalQuery}, count(students) AS total_students
	    FROM teachers
	    LEFT JOIN students ON (teachers.id = students.teacher_id)
	    ${filterQuery}
	    GROUP BY teachers.id LIMIT $1 OFFSET $2
	    `
	 }else{
	    query = `
	    SELECT ${this.table}.*, ${totalQuery}
	    FROM students
	    ${filterQuery}
	    LIMIT $1 OFFSET $2
	    `
	 }

	 const results = await db.query(query, [limit, offset])
	 return results.rows
      }catch(err){
	 console.error(err)
      }
   }
}

module.exports = Base
