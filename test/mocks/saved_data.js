const USER_ONE =
{ network_id : '58754203'
, username : 'kitjuckes'
, first_name : 'Kit'
, last_name : 'Juckes'
, description : 'The Fool on the Hill sees the sun going down ...'
, location : 'Macro-land'
, followers_count : 18453
, friends_count : 1288
, account_created_at : '2009-07-21 02:42:25'
, profile_image_url : 'http://pbs.twimg.com/profile_images/3507423572/ac3063875d92225491bb840b79765d61_normal.jpeg'
, verified : false
}

const USER_TWO =
{ network_id : '58754203'
, username : 'albertcamus'
, first_name : 'Albert'
, last_name : 'Camus'
, description : 'Man is the only creature that refuses to be what he is.'
, location : 'University of Algiers, French Algeria'
, followers_count : 2184534
, friends_count : 11289
, account_created_at : '2015-08-22 03:12:22'
, profile_image_url : 'https://en.wikipedia.org/wiki/Albert_Camus'
, verified : true
}

const POST_ONE =
{ twitter_user_id : '2'
, post_id : '874632141325381600'
, text : 'Autumn is a second spring when every leaf is a flower. Buy AMZN.'
, is_reply : false
, re_status_id : null
, re_network_user_id : null
, re_username : null
, posted_at : null
}

const POST_TWO =
{ twitter_user_id : '2'
, post_id : '8746321413224581600'
, text : 'Nobody realizes that some people expend tremendous energy merely to be normal.'
, is_reply : true
, re_status_id : '874560949847564300'
, re_network_user_id : '138141969'
, re_username : 'TheRealSartre'
, posted_at : '2017-06-13 02:56:27'
}

const STOCK_ONE =
{ symbol : 'ARAY'
, exchange : 'NASDAQ'
, company : 'Accuray Inc'
}

const STOCK_TWO =
{ symbol : 'ELY'
, exchange : 'NYSE'
, company : 'Callaway Golf Co'
}

const STOCK_PRICE_ONE =
{ stock_ticket_id : '1'
, date : '2016-01-06T00:00:00.000-08:00'
, open : '7.72'
, high : '7.77'
, low : '7.59'
, close : '7.69'
, volume : '775739'
}

const STOCK_PRICE_TWO =
{ stock_ticket_id : '1'
, date : '2016-01-07T00:00:00.000-08:00'
, open : '7.69'
, high : '7.85'
, low : '7.22'
, close : '7.77'
, volume : '825735'
}


module.exports = {
  USER_ONE
, USER_TWO
, POST_ONE
, POST_TWO
, STOCK_ONE
, STOCK_TWO
, STOCK_PRICE_ONE
, STOCK_PRICE_TWO
}
