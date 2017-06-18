'use strict'

require('dotenv').config()

const R        = require('ramda')
const Assert = require('assert');
const knex     = require('knex')
const PgInsert = require('../src/postgres/insert.js')
const PgGet    = require('../src/postgres/get.js')

const Inserts = require('./mocks/saved_data.js')

const TEST_DB_NAME = 'test_application_data'

const _conn = {
  host: process.env.POSTGRES_HOST
, port: process.env.POSTGRES_PORT
, database: TEST_DB_NAME
, user: process.env.POSTGRES_USER
, password: process.env.POSTGRES_PW
};

const _knexConfig = {
  client: 'pg'
, version: 9.6
, connection: _conn
};

const Knex = knex(_knexConfig);


describe('Database Retrieval & Manipulation Functions', () => {

  const dropKeys = R.omit(
    [ 'id'
    , 'created_at'
    , 'updated_at'
    , 'deleted'
    , 'deleted_at'
    ])

  describe('#saveUserDetails()', () => {

    it('should return a list of save ids after successful ', () =>
      PgInsert.saveUserDetails(Knex, [ Inserts.USER_ONE, Inserts.USER_TWO ])
      .then( (save_ids) => Assert.deepEqual([ 1, 2 ], save_ids) )
    )
  }),

  describe('#savePostDetails()', () => {

    it('should return a list of save ids after successful ', () =>
      PgInsert.savePostDetails(Knex, [ Inserts.POST_ONE, Inserts.POST_TWO ])
      .then( (save_ids) => Assert.deepEqual([ 1, 2 ], save_ids) )
    )
  }),

  describe('#saveStockTicketDetails()', () => {

    it('should return a list of save ids after successful ', () =>
      PgInsert.saveStockTicketDetails(
        Knex
      , [ Inserts.STOCK_ONE, Inserts.STOCK_TWO ]
      )
      .then( (save_ids) => Assert.deepEqual([ 1, 2 ], save_ids) )
    )
  }),

  describe('#saveStockPriceDetails()', () => {

    it('should return a list of save ids after successful ', () =>
      PgInsert.saveStockPriceDetails(
        Knex
      , [ Inserts.STOCK_PRICE_ONE, Inserts.STOCK_PRICE_TWO ]
      )
      .then( (save_ids) => Assert.deepEqual([ 1, 2 ], save_ids) )
    )
  }),

  describe('#_hasBlacklistTerm', () => {
    let false_text = "This is a great time to buy bananas."
    let true_text  = "This is a great time to buy USD."

    it('should contain the same items as confirmed black list:', () =>
      Assert.deepEqual(Inserts.CONFIRMED_BLACK_LIST, PgGet.BLACK_LIST)
    ),
    it('should return true if a black list term is present in string', () =>
      Assert.equal(true, PgGet._hasBlacklistTerm(PgGet.BLACK_LIST, true_text))
    ),
    it('should return false if a black list term isnt present in string', () =>
      Assert.equal(false, PgGet._hasBlacklistTerm(PgGet.BLACK_LIST, false_text))
    )
  }),

  describe('#_postHasBlackListTerm()', () => {
    let false_obj = { text: "This is a great time to buy AAPL." }
    let true_obj  = { text: "FYI - This is a great time to buy GBP." }

    it('should return true if a black list term is present in object', () =>
      Assert.equal(true, PgGet._postHasBlackListTerm(true_obj))
    ),
    it('should return false if a black list term isnt present in object', () =>
      Assert.equal(false, PgGet._postHasBlackListTerm(false_obj))
    )
  }),

  describe('#getStockTweetsByUserId()', () => {
    let user_with_posts    = 2
    let user_without_posts = 1

    let dropKeys = R.omit(
      [ 'id'
      , 'created_at'
      , 'updated_at'
      , 'deleted'
      , 'deleted_at'
      ])

    it('should return a list containing posts with stock ticket mentions', () =>
      PgGet.getStockTweetsByUserId(Knex, user_with_posts)
      .then( R.compose(dropKeys, R.head) )
      .then( (post_object) => Assert.deepEqual(Inserts.POST_ONE, post_object) )
    ),
    it('should return an empty list when no posts found with stock mentions', () =>
    PgGet.getStockTweetsByUserId(Knex, user_without_posts)
    .then( (post_return) => Assert.deepEqual(true, R.isEmpty(post_return)) )
    )
  }),

  describe('#getUserQueryDetails()', () => {
    let first_user = {
      id: 1
    , username: Inserts.USER_ONE.username
    }

    let second_user = {
      id: 2
    , username: Inserts.USER_TWO.username
    }

    let all_users = [ first_user, second_user ]

    it('should return a list containing the id and username of all users in db', () =>
      PgGet.getUserQueryDetails(Knex)
      .then( (user_return) => Assert.deepEqual(all_users, user_return) )
    )
  }),

  describe('#getPostDetails()', () => {
    let all_posts = [ Inserts.POST_ONE, Inserts.POST_TWO ]

    it('should return a list containing all stored twitter posts', () =>
      PgGet.getPostDetails(Knex)
      .then( R.map(dropKeys) )
      .then( (post_return) => Assert.deepEqual(all_posts, post_return) )
    )
  }),

  describe('#getTicketBySymbol()', () => {

    it('should return a list containing stock ticket details', () =>
      PgGet.getTicketBySymbol(Knex, Inserts.STOCK_TWO.symbol)
      .then( R.compose(dropKeys, R.head) )
      .then( (stock_return) => Assert.deepEqual(Inserts.STOCK_TWO, stock_return) )
    )
  }),

  describe('#getTwitterUserByUsername()', () => {

    it('should return a list containing user details', () =>
      PgGet.getTwitterUserByUsername(Knex, Inserts.USER_TWO.username)
      .then( R.compose(dropKeys, R.head) )
      .then( (user_return) => Assert.deepEqual(Inserts.STOCK_TWO, user_return) )
    )
  }),

  describe('#getTwitterUserById()', () => {

    it('should return a list containing user details', () =>
      PgGet.getTwitterUserById(Knex, 2)
      .then( R.compose(dropKeys, R.head) )
      .then( (user_return) => Assert.deepEqual(Inserts.STOCK_TWO, user_return) )
    )
  }),

  describe('#getTwitterPostById()', () => {

    it('should return a list containing post details', () =>
      PgGet.getTwitterPostById(Knex, 1)
      .then( R.compose(dropKeys, R.head) )
      .then( (post_return) => Assert.deepEqual(Inserts.POST_ONE, post_return) )
    )
  }),

  describe('#getTwitterPostsByUserId()', () => {
    let all_posts = [ Inserts.POST_ONE, Inserts.POST_TWO ]

    it('should return a list containing multiple post details', () =>
      PgGet.getTwitterPostsByUserId(Knex, 2)
      .then( R.map(dropKeys) )
      .then( (post_return) => Assert.deepEqual(all_posts, post_return) )
    )
  }),

  describe('#getStockById()', () => {

    it('should return a list containing stock details', () =>
      PgGet.getStockById(Knex, 1)
      .then( R.compose(dropKeys, R.head) )
      .then( (stock_return) => Assert.deepEqual(Inserts.STOCK_ONE, stock_return) )
    )
  }),

  describe('#getAllStocks()', () => {
    let all_stocks = [ Inserts.STOCK_ONE, Inserts.STOCK_TWO ]

    it('should return a list containing all stock details', () =>
      PgGet.getAllStocks(Knex)
      .then( R.map(dropKeys) )
      .then( (stock_return) => Assert.deepEqual(all_stocks, stock_return) )
    )
  }),

  describe('#getStockHistoryByStockId()', () => {
    let all_prices = [ Inserts.STOCK_PRICE_ONE, Inserts.STOCK_PRICE_TWO ]

    it('should return a list containing the price history details', () =>
      PgGet.getStockHistoryByStockId(Knex, 1)
      .then( R.map(dropKeys) )
      .then( (price_return) => Assert.deepEqual(all_prices, price_return) )
    )
  }),

  describe('#getStockHistoryBySymbol()', () => {
    let all_prices = [ Inserts.STOCK_PRICE_ONE, Inserts.STOCK_PRICE_TWO ]

    it('should return a list containing the price history details', () =>
      PgGet.getStockHistoryBySymbol(Knex, Inserts.STOCK_ONE.symbol)
      .then( R.map(dropKeys) )
      .then( (price_return) => Assert.deepEqual(all_prices, price_return) )
    )
  })

})
