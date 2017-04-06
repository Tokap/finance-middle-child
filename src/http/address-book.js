const R = require('ramda');

const BASE_TWITTER_STATUS_URL = 'https://api.twitter.com/1.1/statuses/user_timeline.json';

// make_twitter_url :: Integer -> String -> Integer -> String
const makeTwitterUrl = R.curry( (id, name, count) =>
  BASE_TWITTER_STATUS_URL + `?count=${count}&user_id=${id}&screen_name=${name}`;
)

module.exports {
  BASE_TWITTER_STATUS_URL : BASE_TWITTER_STATUS_URL
, makeTwitterUrl          : makeTwitterUrl
}
