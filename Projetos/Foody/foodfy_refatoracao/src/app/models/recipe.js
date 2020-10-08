const db = require('../../config/db')
const { date } = require('../../lib/utils')

module.exports = {
   all(callback){
      db.query(`
      SELECT recipes.*, chefs.name AS chefs_name 
      FROM recipes
      LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
      ORDER BY recipes.id
      `, function(err, results){
	 if(err) throw `Database Error! ${err}`

	 callback(results.rows)
      })
   },
   create(data, callback){
      query = `
      INSERT INTO recipes (
      chef_id,
      image,
      title,
      ingredients,
      preparation,
      information,
      created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id
      `
      values = [
	 data.chef_id,
	 data.image,
	 data.title,
	 data.ingredients,
	 data.preparation,
	 data.information,
	 date(Date.now()).iso
      ]

      db.query(query, values, function(err, results){
	 if(err) throw `Database Error! ${err}`

	 callback(results.rows[0])
      })

   },
   find(id, callback){
      db.query(`
      SELECT * FROM recipes
      WHERE id = $1
      `, [id], function(err, results){
	 if(err) throw `Database Error! ${err}`

	 callback(results.rows[0])
      })
   },
   findBy(filter, callback){
      console.log(filter)
      db.query(`
      SELECT recipes.*, chefs.name AS chefs_name
      FROM recipes
      LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
      WHERE recipes.title ILIKE '%${filter}%'
      OR chefs.name ILIKE '%${filter}%'
      `, function(err, results){
	 if(err) throw `Database Error! ${err}`

	 callback(results.rows)
      })
   },
   chefSelectOption(callback){
      db.query(`SELECT name, id FROM chefs`, function(err, results){
	 if(err) throw `Database error! ${err}`

	 callback(results.rows)
      })
   }
}
