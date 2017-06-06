'use strict';

const R      = require('ramda')
const Tables = require('./tables.js')


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
  knex.insert(params, 'id').into(Tables.stock_pricing)
)

module.exports = {
  savePostDetails
, saveStockTicketDetails
, saveStockPriceDetails
, saveUserDetails
}
