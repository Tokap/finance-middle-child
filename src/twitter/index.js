'use strict';

const R       = require('ramda')
const Twitter = require('twitter');

const STATUS_TIMELINE = 'statuses/user_timeline';

require('dotenv').config();

// make_twitter_client :: TwitterClient
const makeTwitterClient = () =>
  new Twitter({
    consumer_key        : process.env.TWITTER_CONSUMER_API_KEY
  , consumer_secret     : process.env.TWITTER_CONSUMER_API_SECRET
  , access_token_key    : process.env.TWITTER_ACCESS_TOKEN
  , access_token_secret : process.env.TWITTER_ACCESS_TOKEN_SECRET
  });

// makeParams :: String -> Int -> TwitterParams
const makeParams = R.curry( (screen_name, post_count) => {
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

// _makeProfileInsert :: TwitterUser -> InsertParameters
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

// _getInsertFromProfile :: TwitterResponse -> InsertParameters
const _getInsertFromProfile = R.compose(_makeProfileInsert, _getUserProfile)

// :: String -> TwitterClient -> InsertParameters
const getUserDetails = R.curry( (screen_name, client) => {
  let params = makeParams(screen_name, 1)
  return client.get(STATUS_TIMELINE, params)
  .then( _getInsertFromProfile )
  .then(console.log)
})

// Example Use of Twitter API Interaction:
let my_params = makeParams('AndreVasilescu', 1);
let my_client = makeTwitterClient();

my_client.get(STATUS_TIMELINE, my_params)
  .then( (tweets) => {
    console.log(tweets);
  })
  .catch( (error) => {
    console.log(error);
  })

// getUserDetails('AndreVasilescu', my_client)

// module.exports = {
//   makeTwitterClient : makeTwitterClient
// , makeParams        : makeParams
// }
