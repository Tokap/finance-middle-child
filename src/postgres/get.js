const R = require('ramda')

const Tables = require('./tables.js')
const Knex = require('./init.js')

const getUserQueryDetails = R.curry( (knex) =>
  knex.select('id', 'username').from(Tables.twitter_user)
)

const getPostDetails = R.curry( (knex, params) =>
  knex.select().from(Tables.twitter_post)
)

module.exports = {
  getUserQueryDetails
, getPostDetails
}
