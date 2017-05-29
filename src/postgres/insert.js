const R = require('ramda')

const Tables = require('./tables.js')
const Knex = require('./init.js')

const saveUserDetails = R.curry( (knex, params) =>
  knex.insert(params, 'id').into(Tables.twitter_user)
)

module.exports = {
  saveUserDetails
}
