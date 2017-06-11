'use strict'

const R      = require('ramda')
const Assert = require('assert');
const Twitter  = require('../src/twitter/index.js')
const Stock  = require('../src/stock/index.js')

describe('Twitter Retrieval & Manipulation Functions', () => {

  const CLIENT = Twitter.makeClient()

  const USER_DETAILS = {
    screen_name: 'JimBob'
  , id: 123456789
  , name: 'John Smith'
  , description: 'An avid twitter user for all things test related'
  , location: 'New York, NY'
  , followers_count: 10000
  , friends_count: 5000
  , created_at: '2009-07-21 02:42:25'
  , profile_image_url: 'https://www.test-site.com'
  , verified: true
  , unused_field: 'Some words go here'
  , another_random_field: 123456
  }

  const TWITTER_DETAILS = { id: 12, user: USER_DETAILS }

  const API_RETURN = [ TWITTER_DETAILS ]

  const DB_INSERT = {
    username: 'JimBob'
  , network_id: 123456789
  , first_name: 'John'
  , last_name: 'Smith'
  , description: 'An avid twitter user for all things test related'
  , location: 'New York, NY'
  , followers_count: 10000
  , friends_count: 5000
  , account_created_at: '2009-07-21 02:42:25'
  , profile_image_url: 'https://www.test-site.com'
  , verified: true
  }

  const UNUSED_OBJECT = { fancy_object: 'value' }

  const UNUSED_NULLABLE = null

  const POST_QUERY_RETURN =
  { created_at: '2009-07-11 05:15:35'
  , id : 5647382
  , id_str : '5647382'
  , text : 'Test post text.'
  , truncated : false
  , entities:
     { hashtags: [ UNUSED_OBJECT ]
     , symbols: [ 'yes', 'no', 'maybe', 'so' ]
     , user_mentions: [ UNUSED_OBJECT ]
     , urls: [ 'https://www.twitter.com', 'https://www.penny-arcade.com' ]
     , media: [ UNUSED_OBJECT ]
     }
  , extended_entities: { media: [ UNUSED_OBJECT ] }
  , source : 'https://www.source.com'
  , in_reply_to_status_id : 9876543
  , in_reply_to_status_id_str : '9876543'
  , in_reply_to_user_id : 12345668
  , in_reply_to_user_id_str : '12345668'
  , in_reply_to_screen_name : 'JerryBob'
  , user : USER_DETAILS
  , geo : UNUSED_NULLABLE
  , coordinates : UNUSED_NULLABLE
  , place : UNUSED_NULLABLE
  , contributors : UNUSED_NULLABLE
  , retweeted_status : UNUSED_OBJECT
  }

  const POST_INSERT = {
    post_id            : 5647382
  , text               : 'Test post text.'
  , posted_at          : '2009-07-11 05:15:35'
  , is_reply           : true
  , re_status_id       : 9876543
  , re_network_user_id : 12345668
  , re_username        : 'JerryBob'
  }

  const VALID_USERNAME = 'allstarcharts'

  describe('#_makeParams()', () => {
    it('should return twitter params when provided arguments', () => {
      let screen_name = 'bobby_rocks'
      let post_count = 100
      let expected_return = { screen_name: screen_name, count: post_count }
      let test_case = Twitter._makeParams(screen_name, post_count)

      Assert.deepEqual(expected_return, test_case)
    })
  }),

  describe('#_getUserProfile()', () => {
    it('should return user details from larger object', () =>
      Assert.deepEqual(USER_DETAILS, Twitter._getUserProfile(API_RETURN))
    )
  }),

  describe('#_getFirstName()', () => {
    it('should return first name from concatenated string', () => {
      let expected_return = 'John'
      let test_case = Twitter._getFirstName(USER_DETAILS)

      Assert.equal(expected_return, test_case)
    })
  }),

  describe('#_getLastName()', () => {
    it('should return last name from concatenated string', () => {
      let expected_return = 'Smith'
      let test_case = Twitter._getLastName(USER_DETAILS)

      Assert.equal(expected_return, test_case)
    })
  }),

  describe('#_makeProfileInsert() & #_getInsertFromProfile()', () => {
    it('should create insert object when provided larger object', () =>
      Assert.deepEqual(DB_INSERT, Twitter._makeProfileInsert(USER_DETAILS))
    ),
    it('should create insert object when provided larger object', () => {
      let test_case = Twitter._getInsertFromProfile(API_RETURN)

      Assert.deepEqual(DB_INSERT, test_case)
    })
  }),

  describe('#getUserDetails() && #makeClient()', () => {
    it('should create a DB insert object from Twitter API return', () => {
      let keys =
        [ 'username'
        , 'network_id'
        , 'first_name'
        , 'last_name'
        , 'description'
        , 'location'
        , 'followers_count'
        , 'friends_count'
        , 'account_created_at'
        , 'profile_image_url'
        , 'verified'
        ]

      return Twitter.getUserDetails(CLIENT, VALID_USERNAME)
      .then(R.keys)
      .then( (return_keys) => Assert.deepEqual(keys, return_keys) )
    })
  }),

  describe('#_isReply()', () => {
    let NOT_A_REPLY = { in_reply_to_user_id: null }

    it('should return true if is_reply_to_user_id contains information', () =>
      Assert.deepEqual(true, Twitter._isReply(POST_QUERY_RETURN))
    ),
    it('should return false if is_reply_to_user_id doesnt contain information', () =>
      Assert.deepEqual(false, Twitter._isReply(NOT_A_REPLY))
    )
  }),

  describe('#_makeTwitterPostInsert()', () => {

    it('should create insert object for DB out of twitter API return', () =>
      Assert.deepEqual(
        POST_INSERT
      , Twitter._makeTwitterPostInsert(POST_QUERY_RETURN)
      )
    )
  }),

  describe('#getRecentTweets()', () => {
    let keys =
    [ 'post_id'
    , 'text'
    , 'posted_at'
    , 'is_reply'
    , 're_status_id'
    , 're_network_user_id'
    , 're_username'
    ]

    it('should return an array of recent tweets for a given user', () =>
    Twitter.getRecentTweets(CLIENT, VALID_USERNAME)
    .then(R.head)
    .then(R.keys)
    .then((return_keys) => Assert.deepEqual(keys, return_keys))
    )
  })
})
