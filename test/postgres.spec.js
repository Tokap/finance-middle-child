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

// _makeDate :: String -> Date
const _makeDate = string => new Date(string)

// propStringToDate :: String -> Object -> Object
const propStringToDate = R.curry( (prop_name, obj) =>
  R.compose(
    R.assoc(prop_name, R.__, obj)
  , _makeDate
  , R.prop(prop_name)
  )(obj)
)

// dropKeys :: Object -> Object
const dropKeys = R.omit(
  [ 'id'
  , 'created_at'
  , 'updated_at'
  , 'deleted'
  , 'deleted_at'
  ])

describe('Database Retrieval & Manipulation Functions', () => {

  const ALL_POSTS = [ Inserts.POST_ONE, Inserts.POST_TWO ]

  const ALL_POSTS_WITH_DATES = R.map(propStringToDate('posted_at'), ALL_POSTS)

  const ALL_PRICES = [ Inserts.STOCK_PRICE_ONE, Inserts.STOCK_PRICE_TWO ]

  const ALL_STOCKS = [ Inserts.STOCK_ONE, Inserts.STOCK_TWO ]

  const SAVED_IDS = [ 1, 2 ]

  const CONFIRMED_BLACK_LIST =
    [ 'USD'
    , 'GBP'
    , 'RIP'
    , 'FYI'
    , 'YES'
    , 'ECB'
    ]


  describe('#saveUserDetails()', () => {

    it('should return a list of save ids after successful ', () =>
      PgInsert.saveUserDetails(Knex, [ Inserts.USER_ONE, Inserts.USER_TWO ])
      .then( (save_ids) => Assert.deepEqual(SAVED_IDS, save_ids) )
    )
  }),

  describe('#savePostDetails()', () => {

    it('should return a list of save ids after successful ', () =>
      PgInsert.savePostDetails(Knex, ALL_POSTS)
      .then( (save_ids) => Assert.deepEqual(SAVED_IDS, save_ids) )
    )
  }),

  describe('#saveStockTicketDetails()', () => {

    it('should return a list of save ids after successful ', () =>
      PgInsert.saveStockTicketDetails(Knex, ALL_STOCKS)
      .then( (save_ids) => Assert.deepEqual(SAVED_IDS, save_ids) )
    )
  }),

  describe('#saveStockPriceDetails()', () => {

    it('should return a list of save ids after successful ', () =>
      PgInsert.saveStockPriceDetails(Knex, ALL_PRICES)
      .then( (save_ids) => Assert.deepEqual(SAVED_IDS, save_ids) )
    )
  }),

  describe('#_hasBlacklistTerm', () => {
    let false_text = "This is a great time to buy bananas."
    let true_text  = "This is a great time to buy USD."

    it('should contain the same items as confirmed black list:', () =>
      Assert.deepEqual(CONFIRMED_BLACK_LIST, PgGet.BLACK_LIST)
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

    it('should return a list containing posts with stock ticket mentions', () =>
      PgGet.getStockTweetsByUserId(Knex, user_with_posts)
      .then( R.compose(dropKeys, R.head) )
      .then( (post_object) =>
        Assert.deepEqual(
          propStringToDate('posted_at', Inserts.POST_ONE)
        , post_object
        )
      )
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

    it('should return a list containing all stored twitter posts', () =>
      PgGet.getPostDetails(Knex)
      .then( R.map(dropKeys) )
      .then( (post_return) => Assert.deepEqual(ALL_POSTS_WITH_DATES, post_return) )
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
    let user_details = propStringToDate('account_created_at', Inserts.USER_TWO)

    it('should return a list containing user details', () =>
      PgGet.getTwitterUserByUsername(Knex, Inserts.USER_TWO.username)
      .then( R.compose(dropKeys, R.head) )
      .then( (user_return) => Assert.deepEqual(user_details, user_return) )
    )
  }),

  describe('#getTwitterUserById()', () => {
    let user_details = propStringToDate('account_created_at', Inserts.USER_TWO)

    it('should return a list containing user details', () =>
      PgGet.getTwitterUserById(Knex, 2)
      .then( R.compose(dropKeys, R.head) )
      .then( (user_return) => Assert.deepEqual(user_details, user_return) )
    )
  }),

  describe('#getTwitterPostById()', () => {
    let post_details = propStringToDate('posted_at', Inserts.POST_ONE)

    it('should return a list containing post details', () =>
      PgGet.getTwitterPostById(Knex, 1)
      .then( R.compose(dropKeys, R.head) )
      .then( (post_return) => Assert.deepEqual(post_details, post_return) )
    )
  }),

  describe('#getTwitterPostsByUserId()', () => {

    it('should return a list containing multiple post details', () =>
      PgGet.getTwitterPostsByUserId(Knex, 2)
      .then( R.map(dropKeys) )
      .then( (post_return) => Assert.deepEqual(ALL_POSTS_WITH_DATES, post_return) )
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

    it('should return a list containing all stock details', () =>
      PgGet.getAllStocks(Knex)
      .then( R.map(dropKeys) )
      .then( (stock_return) => Assert.deepEqual(ALL_STOCKS, stock_return) )
    )
  }),

  describe('#getStockHistoryByStockId()', () => {

    it('should return a list containing the price history details', () =>
      PgGet.getStockHistoryByStockId(Knex, 1)
      .then( R.map(dropKeys) )
      .then( (price_return) => Assert.deepEqual(ALL_PRICES, price_return) )
    )
  }),

  describe('#getStockHistoryBySymbol()', () => {
    let all_prices =
      [ R.merge(Inserts.STOCK_PRICE_ONE, Inserts.STOCK_ONE)
      , R.merge(Inserts.STOCK_PRICE_TWO, Inserts.STOCK_ONE)
      ]

    it('should return a list containing the price history details', () =>
      PgGet.getStockHistoryBySymbol(Knex, Inserts.STOCK_ONE.symbol)
      .then( R.map(dropKeys) )
      .then( (price_return) => Assert.deepEqual(all_prices, price_return) )
    )
  })

})
