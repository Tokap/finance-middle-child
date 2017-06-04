const R        = require('ramda')
const Bluebird = require('bluebird')
const Finance  = Bluebird.promisifyAll(require('google-finance'))
const Moment   = require('moment')

const Knex     = require('../postgres/init.js')
const Tables   = require('../postgres/tables.js')

const HISTORY_START_DATE = '2015-01-01'
const HISTORY_END_DATE = Moment().format('YYYY-MM-DD')
const NASDAQ = 'NASDAQ'
const NYSE = 'NYSE'

const STOCK_TICKET_FORMAT = /\b[A-Z]{3,4}\b/g

const BLACK_LIST = [
  'USD'
, 'GBP'
, 'RIP'
, 'FYI'
, 'YES'
, 'ECB'
]

// _containsStockTicket :: String -> Bool
const _containsStockTicket = R.test(STOCK_TICKET_FORMAT);

// postHasStockTicket :: Object -> Bool
const postHasStockTicket   = R.compose(_containsStockTicket, R.prop('text'))

const _tap = (item) => {
  console.log('Tap_tap: ', item)
  return item
}

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

// _getStockTickets :: String -> List String
const _getStockTickets = R.match(STOCK_TICKET_FORMAT)

// _getTicketsFromPost :: Object -> List String
const _getTicketsFromPost = R.compose(_getStockTickets, R.prop('text'))

// _validPostOrNull :: StoredTwitterPost
const _validPostOrNull = (post) => {
  let tickets = _getTicketsFromPost(post)
  return Bluebird.map(tickets, validateStockTicket)
  .then( (bools) => {
    if (R.contains(true, bools)) {
      return post
    }
    else {
      return null
    }
  })
}

// validateTicketsInPosts :: List StoredTwitterPost -> List StoredTwitterPost
const validateTicketsInPosts = (posts) =>
  Bluebird.map(posts, _validPostOrNull)
  .then(R.reject(R.isNil))

// getStockTweetsById :: Number -> List StoredTwitterPost
const getStockTweetsById = (user_id) =>
  Knex.select().from(Tables.twitter_post).where({twitter_user_id: user_id})
  .then(R.filter(postHasStockTicket))
  .then(R.reject(_postHasBlackListTerm))
  .then(validateTicketsInPosts)

// getStockHistory :: Date -> Date -> String -> String -> List StockDetailsApi
const getStockHistory = R.curry( (start_date, end_date, exchange, symbol) => {
  return Finance.historical({
    symbol: `${exchange}:${symbol}`
  , from: start_date
  , to: end_date
  })
})

// getStockNews :: String -> String -> List StockInfo
const getStockNews = (exchange, symbol) =>
  Finance.companyNews( {symbol: `${exchange}:${symbol}`} )

// _getStockInfoBySymbolList :: List String -> List StockObject
const _getStockInfoBySymbolList = (symbol_array) =>
  Bluebird.map(
    symbol_array
  , getStockHistory(HISTORY_START_DATE, HISTORY_END_DATE, NYSE)
  )
  .then(R.flatten)

// getStockInfoByUserPost :: Number -> List (Maybe StockDetails)
// Returns empty list if no results.
const getStockInfoByUserPost = (user_id) =>
  getStockTweetsById(user_id)
  .then(R.map(_getTicketsFromPost))
  .then( (tickets) => Bluebird.map(tickets, _getStockInfoBySymbolList) )

// validateStockTicket :: String -> Bool
const validateStockTicket = (symbol) => {
  let end = Moment().format("YYYY-MM-DD")
  let start = Moment().subtract(10, 'day').format("YYYY-MM-DD")

  return getStockHistory(start, end, NASDAQ, symbol)
  .then(R.compose(R.not, R.isEmpty))
}

module.exports = {
  postHasStockTicket
, getStockHistory
, getStockNews
, getStockInfoByUserPost
, getStockTweetsById
, validateStockTicket
, validateTicketsInPosts
}
