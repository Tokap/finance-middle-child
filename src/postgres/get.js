'use strict';

const R      = require('ramda')
const Stock  = require('../stock/index.js')
const Tables = require('./tables.js')

const BLACK_LIST = [
  'USD'
, 'GBP'
, 'RIP'
, 'FYI'
, 'YES'
, 'ECB'
]


// _postHasBlackListTerm :: List String -> Bool
const _hasBlacklistTerm = R.curry( (black_list, text) =>
  R.compose(
    R.contains(true)
  , R.map(R.contains(R.__, text))
  )(black_list)
)

// _postHasBlackListTerm :: String -> Bool
const _postHasBlackListTerm = R.compose(
  _hasBlacklistTerm(BLACK_LIST)
, R.prop('text')
)

// getStockTweetsById :: Number -> List StoredTwitterPost
const getStockTweetsById = R.curry ( (knex, user_id) =>
  knex.select().from(Tables.twitter_post).where({twitter_user_id: user_id})
  .then(R.filter(Stock.postHasStockTicket))
  .then(R.reject(_postHasBlackListTerm))
)

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
  getPostDetails
, getStockTweetsById
, getTicketBySymbol
, getUserQueryDetails
}
