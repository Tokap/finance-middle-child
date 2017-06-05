const R = require('ramda')

const Tables = require('./tables.js')
const Knex = require('./init.js')

const getUserQueryDetails = R.curry( (knex) =>
  knex.select('id', 'username').from(Tables.twitter_user)
)

const getPostDetails = R.curry( (knex) =>
  knex.select().from(Tables.twitter_post)
)

const getTicketBySymbol = R.curry( (knex, symbol) =>
  knex.select().from(Tables.stock_ticket).where( { symbol: symbol } )
)

module.exports = {
  getUserQueryDetails
, getPostDetails
, getTicketBySymbol
}
