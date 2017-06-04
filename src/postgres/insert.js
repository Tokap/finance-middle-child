const R = require('ramda')

const Tables = require('./tables.js')
const Knex = require('./init.js')

const saveUserDetails = R.curry( (knex, params) =>
  knex.insert(params, 'id').into(Tables.twitter_user)
)

const savePostDetails = R.curry( (knex, params) =>
  knex.insert(params, 'id').into(Tables.twitter_post)
)

const saveStockTicketDetails = R.curry( (knex, params) =>
  knex.insert(params, 'id').into(Tables.stock_ticket)
)

const saveStockPriceDetails = R.curry( (knex, params) =>
  knex.insert(params, 'id').into(Tables.stock_price)
)

module.exports = {
  saveUserDetails
, savePostDetails
, saveStockTicketDetails
, saveStockPriceDetails
}
