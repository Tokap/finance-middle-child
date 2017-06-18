'use strict'

const R      = require('ramda')
const Tables = require('./tables.js')


// saveUserDetails :: Knex -> Object -> List Number
const saveUserDetails = R.curry( (knex, params) =>
  knex.insert(params, 'id').into(Tables.twitter_user)
)

// savePostDetails :: Knex -> Object -> List Number
const savePostDetails = R.curry( (knex, params) =>
  knex.insert(params, 'id').into(Tables.twitter_post)
)

// saveStockTicketDetails :: Knex -> Object -> List Number
const saveStockTicketDetails = R.curry( (knex, params) =>
  knex.insert(params, 'id').into(Tables.stock_ticket)
)

// saveStockPriceDetails :: Knex -> Object -> List Number
const saveStockPriceDetails = R.curry( (knex, params) =>
  knex.insert(params, 'id').into(Tables.stock_pricing)
)


module.exports = {
  savePostDetails
, saveStockTicketDetails
, saveStockPriceDetails
, saveUserDetails
}
