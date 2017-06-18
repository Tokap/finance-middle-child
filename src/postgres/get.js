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

// getUserQueryDetails :: Knex -> List Object
const getUserQueryDetails = R.curry( (knex) =>
  knex.select('id', 'username').from(Tables.twitter_user)
)

// getPostDetails :: Knex -> List Object
const getPostDetails = R.curry( (knex) =>
  knex.select().from(Tables.twitter_post)
)

// getTicketBySymbol :: Knex -> String -> List Object
const getTicketBySymbol = R.curry( (knex, symbol) =>
  knex.select().from(Tables.stock_ticket).where( { symbol: symbol } )
)

// getTwitterUserByUsername :: Knex -> String -> List Object
const getTwitterUserByUsername = R.curry( (knex, username) => {
  let where = `LOWER(username)= ?`
  let params = `${R.toLower(username)}`

  return knex(Tables.twitter_user).whereRaw(where, params)
})

// getTwitterUserById :: Knex -> Number -> List Object
const getTwitterUserById = R.curry( (knex, user_id) =>
  knex(Tables.twitter_user).where({ id : user_id })
)

// getTwitterPostById :: Knex -> Number -> List Object
const getTwitterPostById = R.curry( (knex, post_id) =>
  knex(Tables.twitter_post).where({ id : post_id })
)

// getTwitterPostsByUserId :: Knex -> Number -> List Object
const getTwitterPostsByUserId = R.curry( (knex, user_id) =>
  knex(Tables.twitter_post).where({ twitter_user_id : user_id })
)

// getStockById :: Knex -> Number -> List Object
const getStockById = R.curry( (knex, stock_id) =>
  knex(Tables.stock_ticket).where({ id : stock_id })
)

// getStockById :: Knex -> List Object
const getAllStocks = R.curry( (knex) =>
  knex.select().table(Tables.stock_ticket)
)

// getStockHistoryByStockId :: Knex -> Number -> List Object
const getStockHistoryByStockId = R.curry( (knex, stock_id) =>
  knex(Tables.stock_pricing)
  .where({ stock_ticket_id : stock_id })
  .orderBy('date', 'asc')
)

// getStockHistoryBySymbol :: Knex -> String -> List Object
const getStockHistoryBySymbol = R.curry( (knex, symbol) => {
  let where = `LOWER(symbol)= ?`
  let params = `${R.toLower(symbol)}`

  return knex(Tables.stock_pricing)
  .leftJoin('stock_ticket', 'stock_ticket.id', 'stock_pricing.stock_ticket_id')
  .whereRaw(where, params)
  .orderBy('date', 'asc')
})


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
