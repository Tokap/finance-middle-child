const R        = require('ramda')
const Bluebird = require('bluebird')
const Finance  = Bluebird.promisifyAll(require('google-finance'))

const Knex     = require('../postgres/init.js')
const Tables   = require('../postgres/tables.js')


// @TODO Simple regex helps in filter, but over inclusive.
// Consider expanding to include a reference to a list of all stock tickets
// (I hope you like data) and comparing the 3-4 cap letters to that list.

// If data sample above is untenable. use a finance API to validate stock

const CONTAINS_STOCK_TICKET = /\b[A-Z]{3,4}\b/g

const _containsStockTicket = R.test(CONTAINS_STOCK_TICKET);

const _postHasStockTicket   = R.compose(_containsStockTicket, R.prop('text'))


const BLACK_LIST = [
  'USD'
, 'GBP'
, 'RIP'
, 'FYI'
, 'YES'
]

const _hasBlacklistTerm = R.curry( (black_list, text) =>
  R.compose(
    R.contains(true)
  , R.map( R.contains(R.__, text) )
  )(black_list)
)

const _postHasBlackListTerm = R.compose(
  _hasBlacklistTerm(BLACK_LIST)
, R.prop('text')
)

const getStockTweets = (user_id) =>
  Knex.select().from(Tables.twitter_post).where({twitter_user_id: user_id})
  .then(R.filter(_postHasStockTicket))
  .then(R.reject(_postHasBlackListTerm))

const getStockHistory = (start_date, end_date, exchange, symbol) =>
  Finance.historical({
    symbol: [ `${exchange}:${symbol}` ]
  , from: start_date
  , to: end_date
  })

const getStockNews = (exchange, symbol) =>
  Finance.companyNews( {symbol: `${exchange}:${symbol}`} )

// const AAPL = {symbol: 'NASDAQ:AAPL'}
//
// Finance.companyNews(AAPL)
// .then( (rez) => console.log('Look! a response: ', rez))

// Finance.historical({
//   symbols: [SYMBOL1, SYMBOL2],
//   from: START_DATE,
//   to: END_DATE
// })

// "NYSE:TWTR"

// getStockTweets(1)
// .then(rez => console.log('Yay!: ', rez))

module.exports = {
  getStockHistory
, getStockNews
, getStockTweets
}
