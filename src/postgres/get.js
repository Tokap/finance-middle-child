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

const getTwitterUserByUsername = R.curry( (knex, username) => {
  let where = `LOWER(username)= ?`
  let params = `${R.toLower(username)}`

  return knex(Tables.twitter_user).whereRaw(where, params)
})

const getTwitterUserById = R.curry( (knex, user_id) =>
  knex(Tables.twitter_user).where({ id : user_id })
)

const getTwitterPostById = R.curry( (knex, post_id) =>
  knex(Tables.twitter_post).where({ id : post_id })
)

const getTwitterPostsByUserId = R.curry( (knex, user_id) =>
  knex(Tables.twitter_post).where({ twitter_user_id : user_id })
)

const getStockById = R.curry( (knex, stock_id) =>
  knex(Tables.stock_ticket).where({ id : stock_id })
)

const getAllStocks = R.curry( (knex) =>
  knex.select().table(Tables.stock_ticket)
)

const getStockHistoryByStockId = R.curry( (knex, stock_id) =>
  knex(Tables.stock_pricing)
  .where({ stock_ticket_id : stock_id })
  .orderBy('date', 'asc')
)

const getStockHistoryBySymbol = R.curry( (knex, symbol) =>
  knex(Tables.stock_pricing)
  .leftJoin('stock_ticket', 'stock_ticket.id', 'stock_pricing.stock_ticket_id')
  .where({ symbol : symbol })
  .orderBy('date', 'asc')
)


module.exports = {
  getPostDetails
, getStockTweetsById

, getStockById
, getStockHistoryByStockId
, getStockHistoryBySymbol

, getAllStocks
, getTicketBySymbol

, getTwitterPostById
, getTwitterPostsByUserId

, getTwitterUserById
, getTwitterUserByUsername
, getUserQueryDetails
}
