'use strict';

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

// makeParams :: String -> Int -> Int -> TwitterParams
const makeParams = (screen_name, user_id, post_count) => {
  return {
    screen_name : screen_name
  , user_id     : user_id
  , count       : post_count
  }
}

module.exports = {
  makeTwitterClient : makeTwitterClient
, makeParams        : makeParams
}
