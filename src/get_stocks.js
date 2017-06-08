'use strict'

require('dotenv').config();

const R         = require('ramda')
const Bluebird  = require('bluebird')
const Knex      = require('./postgres/init.js')
const PgInsert  = require('./postgres/insert.js')
const PgGet     = require('./postgres/get.js')
const Stock     = require('./stock/index.js')
const StockSeed = require('./stock/ticket_seed.js')

const MAX_CONCURRENCY = { concurrency: 2 }


// _addTicketIdToDetails :: Object -> List Number -> Object
const _addTicketIdToDetails = R.curry( (details, save_id) =>
  R.compose(
    R.assoc('stock_ticket_id', R.__, details)
  , R.head
  )(save_id)
)

// _updateKeys :: UpdatedSeedDetails -> List StockDetailsApi ->
const _updateKeys = R.curry( ({ stock_ticket_id }, price_details) =>
  R.compose(
    R.assoc('stock_ticket_id', stock_ticket_id)
  , R.dissoc('symbol')
  )(price_details)
)

// _insertPrice ::
// Knex -> UpdatedSeedDetails -> List StockDetailsApi -> List (List Number)
const _insertPrice = R.curry( (knex, seed_details, price_array) => {
  let insert_list = R.map(_updateKeys(seed_details), price_array)

  return Bluebird.map(insert_list, PgInsert.saveStockPriceDetails(knex))
})

// _getAndInsertHistory :: Knex -> UpdatedSeedDetails -> List Number
const _getAndInsertHistory = R.curry( (knex, details) => {
  let { exchange, symbol } = details

  return Stock.getStandardHistory(exchange, symbol)
  .then(_insertPrice(knex, details))
  .then(R.flatten)
})

// _saveAndGetHistory :: Knex -> Object -> List Number
const _saveAndGetHistory = R.curry( (knex, details) =>
  PgInsert.saveStockTicketDetails(knex, details)
  .then(_addTicketIdToDetails(details))
  .then(_getAndInsertHistory(knex))
)

// seedStockData :: Knex -> List SeedDetails -> I/O
const seedStockData = R.curry( (knex, seed_array) =>
  Bluebird.map(seed_array, _saveAndGetHistory(knex), MAX_CONCURRENCY)
  .then(() => {
    console.log('Stock Seed Complete!')
    process.exit(0)
  })
  .catch((e) => console.log('Error During Stock History Seed!', e))
)

console.log('Retrieving Stock Price History and Saving to DB.')
seedStockData(Knex, StockSeed.STOCK_TICKETS)
