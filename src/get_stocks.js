'use strict'

require('dotenv').config();

const R        = require('ramda')
const Bluebird = require('bluebird')

const Knex     = require('./postgres/init.js')
const PgInsert = require('./postgres/insert.js')
const PgGet    = require('./postgres/get.js')
const Stock    = require('./stock/index.js')
const Twitter  = require('./twitter/index.js')
const TwitterSeed = require('./twitter/user_seed.js')

// _getStockTicket :: StockDetailsApi -> String
const _getStockTicket =
  R.compose(
    R.last
  , R.split(':')
  , R.prop('symbol')
  )

// _getOrMakeTicketId :: Knex -> String -> List String -> Number
const _getOrMakeTicketId = R.curry( (knex, symbol, maybe_array) => {
  if (R.isEmpty(maybe_array)) {
    return PgInsert.saveStockTicketDetails(knex, {symbol: symbol})
    .then(R.head)
  }
  else {
    return R.compose(R.prop('id'), R.head)(maybe_array)
  }
})

// _makeInsertParams :: StockDetailsApi -> Number -> StockTicketInsert
const _makeInsertParams = R.curry( (stock_details, ticket_id) =>
  R.compose(
    R.dissoc('symbol')
  , R.assoc('stock_ticket_id', ticket_id)
  )(stock_details)
)


// const _getIdAndSearch = R.curry( (user_details) => {
//   let id = R.prop('id', user_details)
//   return Stock.getStockInfoByUserPost(id)
// })

const _insertStockData = R.curry( (knex, stock_details, ticket_id) => {
  let params = _makeInsertParams(stock_details, ticket_id)
  console.log('params', params)

  return PgInsert.saveStockPriceDetails(knex, params)
})

const insertStockPrice = R.curry( (knex, stock_details) => {
  let symbol = _getStockTicket(stock_details)

  PgGet.getTicketBySymbol(knex, symbol)
  .then(_getOrMakeTicketId(knex, symbol))
  .then(_insertStockData(knex, stock_details))
})

const saveUserPostStockDetails = R.curry( (knex, user_id) => {
  Stock.getStockInfoByUserPost(user_id)
  .then(R.map(insertStockPrice(Knex)))
})

// Got throttled by API
// const getStockDetailsFromAllUserPosts = R.curry( (knex) => {
//   console.log('getting user query details')
//   return PgGet.getUserQueryDetails(knex)
//   .then( (rez) => {
//     console.log('ok, here goes this big part')
//     return Bluebird.map(rez, _getIdAndSearch)
//     .then(console.log)
//   })
// })



let test_obj = {
  symbol: 'AAPL'
, date: '2017-06-04T22:33:38.455Z'
, open: 100.20
, close: 105.20
, high: 300.20
, low: 200.20
, volume: 1234567890
}


// insertStockPrice(Knex, test_obj)
// getStockDetailsFromAllUserPosts(Knex)
Stock.getStockInfoByUserPost(5)
.then(console.log)

Stock.getStockNews
// Stock.getStockInfoByUserPost(1)
// .then()
// PgInsert