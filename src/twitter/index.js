'use strict';

const R       = require('ramda')
const Twitter = require('twitter');

const STATUS_TIMELINE = 'statuses/user_timeline';

require('dotenv').config();

// makeClient :: TwitterClient
const makeClient = () =>
  new Twitter({
    consumer_key        : process.env.TWITTER_CONSUMER_API_KEY
  , consumer_secret     : process.env.TWITTER_CONSUMER_API_SECRET
  , access_token_key    : process.env.TWITTER_ACCESS_TOKEN
  , access_token_secret : process.env.TWITTER_ACCESS_TOKEN_SECRET
  });

// _makeParams :: String -> Int -> TwitterParams
const _makeParams = R.curry( (screen_name, post_count) => {
  return {
    screen_name : screen_name
  , count       : post_count
  }
})

// _getUserProfile :: TweetQueryReturn -> TwitterUser
const _getUserProfile = R.compose(R.prop('user'), R.head)

// _getFirstName :: TwitterUser -> String
const _getFirstName = R.compose(
  R.head
, R.split(' ')
, R.prop('name')
)

// _getLastName :: TwitterUser -> String
const _getLastName = R.compose(
  R.join(' ')
, R.tail
, R.split(' ')
, R.prop('name')
)

// _makeProfileInsert :: TwitterUser -> ProfileInsert
const _makeProfileInsert = R.applySpec({
  username           : R.propOr(null, 'screen_name')
, network_id         : R.propOr(null, 'id')
, first_name         : _getFirstName
, last_name          : _getLastName
, description        : R.propOr(null, 'description')
, location           : R.propOr(null, 'location')
, followers_count    : R.propOr(null, 'followers_count')
, friends_count      : R.propOr(null, 'friends_count')
, account_created_at : R.propOr(null, 'created_at')
, profile_image_url  : R.propOr(null, 'profile_image_url')
, verified           : R.propOr(null, 'verified')
})

// _getInsertFromProfile :: TwitterResponse -> ProfileInsert
const _getInsertFromProfile = R.compose(_makeProfileInsert, _getUserProfile)

// getUserDetails :: TwitterClient -> String -> ProfileInsert
const getUserDetails = R.curry( (client, screen_name) => {
  let params = _makeParams(screen_name, 1)
  return client.get(STATUS_TIMELINE, params)
  .then( _getInsertFromProfile )
})

// _isReply :: TwitterReturn -> Bool
const _isReply = R.compose(R.not, R.isNil, R.prop('in_reply_to_user_id'))

// @TODO - add process to handle entities: hashtags,symbols,user_mentions, urls
// _makeTwitterPostInsert :: TwitterQueryReturn -> PostInsert
const _makeTwitterPostInsert = R.applySpec({
  post_id            : R.propOr(null, 'id')
, text               : R.propOr(null, 'text')
, posted_at          : R.propOr(null, 'created_at')
, is_reply           : _isReply
, re_status_id       : R.propOr(null, 'in_reply_to_status_id')
, re_network_user_id : R.propOr(null, 'in_reply_to_user_id')
, re_username        : R.propOr(null, 'in_reply_to_screen_name')
})

// getRecentTweets :: TwitterClient -> String -> List PostInsert
const getRecentTweets = R.curry( (client, screen_name) => {
  let params = _makeParams(screen_name, 150)
  return client.get(STATUS_TIMELINE, params)
  .then( R.map(_makeTwitterPostInsert) )
})

module.exports = {
  getRecentTweets
, getUserDetails
, makeClient

// Exported for testing
, _makeParams
, _getUserProfile
, _getFirstName
, _getLastName
, _makeProfileInsert
, _getInsertFromProfile
, _isReply
, _makeTwitterPostInsert
}
