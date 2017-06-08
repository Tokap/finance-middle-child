'use strict';

const R        = require('ramda')
const Bluebird = require('bluebird')
const Finance  = Bluebird.promisifyAll(require('google-finance'))
const Moment   = require('moment')
const PgGet    = require('../postgres/get.js')

const HISTORY_START_DATE = '2015-01-01'
const HISTORY_END_DATE = Moment().format('YYYY-MM-DD')
const NASDAQ = 'NASDAQ'
const NYSE = 'NYSE'

const STOCK_TICKET_FORMAT = /\b[A-Z]{3,4}\b/g

const MAX_CONCURRENCY = { concurrency: 4 }

// _containsStockTicket :: String -> Bool
const _containsStockTicket = R.test(STOCK_TICKET_FORMAT);

// postHasStockTicket :: Object -> Bool
const postHasStockTicket   = R.compose(_containsStockTicket, R.prop('text'))

// _getStockTickets :: String -> List String
const _getStockTickets = R.match(STOCK_TICKET_FORMAT)

// _getTicketsFromPost :: Object -> List String
const _getTicketsFromPost = R.compose(_getStockTickets, R.propOr('', 'text'))

// getPriceHistory :: Date -> Date -> String -> String -> List StockDetailsApi
const getPriceHistory = R.curry( (start_date, end_date, exchange, symbol) => {
  return Finance.historical({
    symbol: `${exchange}:${symbol}`
  , from: start_date
  , to: end_date
  })
})

// getStandardHistory :: String -> String -> List StockDetailsApi
const getStandardHistory =
  getPriceHistory(HISTORY_START_DATE, HISTORY_END_DATE)


// NOTE: Hits Finance API and will be throttled if too fast
// validateStockTicket :: String -> Bool
const validateStockTicket = (symbol) => {
  let end = Moment().format("YYYY-MM-DD")
  let start = Moment().subtract(10, 'day').format("YYYY-MM-DD")

  return getPriceHistory(start, end, NASDAQ, symbol)
  .then(R.compose(R.not, R.isEmpty))
}

// _validPostOrNull :: StoredTwitterPost -> Maybe StoredTwitterPost
const _validPostOrNull = (post) => {
  let tickets = _getTicketsFromPost(post)
  return Bluebird.map(tickets, validateStockTicket, MAX_CONCURRENCY)
  .then( (bools) => {
    if (R.contains(true, bools)) {
      return post
    }
    else {
      return null
    }
  })
}

// NOTE: Hits Finance API and will be throttled if too fast
// validateTicketsInPosts :: List StoredTwitterPost -> List StoredTwitterPost
const validateTicketsInPosts = (posts) =>
  Bluebird.map(posts, _validPostOrNull)
  .then(R.reject(R.isNil))

// _getStockInfoBySymbolList :: List String -> List StockDetailsApi
const _getStockInfoBySymbolList = (symbol_array) =>
  Bluebird.map(
    symbol_array
  , getPriceHistory(HISTORY_START_DATE, HISTORY_END_DATE, NYSE)
  , MAX_CONCURRENCY
  )
  .then(R.flatten)

// getStockInfoByUserPost :: Number -> List StockDetailsApi
// Returns empty list if no results.
const getStockInfoByUserPost = (user_id) =>
  PgGet.getStockTweetsById(user_id)
  .then(R.map(_getTicketsFromPost))
  .then( (tickets) =>
    Bluebird.map(tickets, _getStockInfoBySymbolList, MAX_CONCURRENCY)
  )

// getNews :: String -> String -> List StockInfo
const getNews = (exchange, symbol) =>
  Finance.companyNews( {symbol: `${exchange}:${symbol}`} )


module.exports = {
  getNews
, getPriceHistory
, getStandardHistory
, getStockInfoByUserPost
, postHasStockTicket
, validateStockTicket
, validateTicketsInPosts

// Exported for testing
, _containsStockTicket
, _getStockTickets
, _getTicketsFromPost
, _validPostOrNull
, _getStockInfoBySymbolList
}
