'use strict';

const R = require('ramda');

const BASE_QUOTE_URL = "http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=";
const BASE_TWITTER_STATUS_URL = 'https://api.twitter.com/1.1/statuses/user_timeline.json';

// makeTwitterUrl :: Integer -> String -> Integer -> String
const makeTwitterUrl = R.curry( (id, name, count) =>
  BASE_TWITTER_STATUS_URL + `?count=${count}&user_id=${id}&screen_name=${name}`
)

// makeMarketUrl :: String -> String
const makeMarketUrl = R.curry( (stock_symbol) => {
  return BASE_QUOTE_URL + stock_symbol
});

module.exports = {
  BASE_TWITTER_STATUS_URL : BASE_TWITTER_STATUS_URL
, makeTwitterUrl          : makeTwitterUrl
, makeMarketUrl           : makeMarketUrl
}
