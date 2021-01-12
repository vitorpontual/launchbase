const db = require('../../config/db')
const Base = require('./Base')
const { age, date } = require('../../lib/utils')

Base.init({table: 'students'})

module.exports = {
   ...Base,
}


