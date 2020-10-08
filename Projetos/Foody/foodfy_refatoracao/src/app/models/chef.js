const db = require('../../config/db')
const { date } = require('../../lib/utils')

module.exports = {
   all(callback){
      db.query(`SELECT chefs.*, count(recipes) as total_recipes
	 FROM chefs
	 LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
	 GROUP BY chefs.id
	 ORDER BY total_recipes
      `, function(err, results){
	 if(err) throw `Database Error! ${err}`

	 callback(results.rows)
      })
   },
   create(data, callback){

      const query = `
      INSERT INTO chefs(
	 name,
	 avatar_url,
	 created_at,
      ) VALUES ($1, $2, $3)
      RETURNING id
      `
      const values = [
	 data.name,
	 data.avatar_url,
	 date(Date.now()).iso
      ]
   },
   find(id, callback){
      db.query(`
      SELECT chefs.*, count(recipes) AS total_recipes
      FROM chefs
      LEFT JOIN recipes ON chefs.id = recipes.chef_id
      WHERE chefs.id = $1
      GROUP BY chefs.id
      `,[id], function(err, results){
	if(err) throw `Database Error! ${err}`

	 callback(results.rows[0])
      })
   },
   findRecipesChef(id, callback){
      db.query(`
      SELECT chefs.*, recipes.*
      FROM chefs
      INNER JOIN recipes ON chefs.id = recipes.chef_id
      WHERE chefs.id = $1
      `, [id], function(err, results){
	 if(err) `Database Error! ${err}`

	 callback(results.rows)
      }
      )
   }
}
