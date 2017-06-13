// type alias UnusedObject = { key: value, ... }

// type alias TweetApi =
// { created_at: String
// , id : Number
// , id_str : String
// , text : String
// , truncated : Bool
// , entities:
//    { hashtags: [ UnusedObject ]
//    , symbols: List String
//    , user_mentions: [ UnusedObject ]
//    , urls: List String
//    , media: [ UnusedObject ]
//    }
// , extended_entities: { media: [ UnusedObject ] }
// , source : String
// , in_reply_to_status_id : Number
// , in_reply_to_status_id_str : String
// , in_reply_to_user_id : Number
// , in_reply_to_user_id_str : String
// , in_reply_to_screen_name : String
// , user : TwitterUser
// , geo : String
// , coordinates : String
// , place : String
// , contributors : String
// , retweeted_status : UnusedObject

// type alias QueryDetails =
// { id : Number
// , username: String
// }

// type alias TwitterUser =
// { id : Number
// , id_str : String
// , name : String ( Ex - 'Jane Smith' )
// , screen_name : String
// , location : String ( Ex - 'New York, USA' )
// , description : String
// , url : String
// , entities : { description : { urls : List String } }
// , protected : Bool
// , followers_count : Number
// , friends_count : Number
// , listed_count : Number
// , created_at : String ( Ex - 'Mon Feb 02 15:18:51 +0000 2015' )
// , favourites_count : Number
// , utc_offset : Number
// , time_zone : String ( Ex - 'Pacific Time (US & Canada)' )
// , geo_enabled : Bool
// , verified : Bool
// , statuses_count : Number
// , lang : String ( Ex - 'en' )
// , contributors_enabled : Bool
// , is_translator : Bool
// , is_translation_enabled : Bool
// , profile_background_color : String ( Ex - '000000' )
// , profile_background_image_url : String
// , profile_background_image_url_https : String
// , profile_background_tile : Bool
// , profile_image_url : String
// , profile_image_url_https : String
// , profile_link_color : String ( Ex - '4A913C' )
// , profile_sidebar_border_color : String ( Ex - '000000' )
// , profile_sidebar_fill_color : String ( Ex - '000000' )
// , profile_text_color : String ( Ex - '000000' )
// , profile_use_background_image : Bool
// , has_extended_profile : Bool
// , default_profile : Bool
// , default_profile_image : Bool
// , following : Bool
// , follow_request_sent : Bool
// , notifications : Bool
// , translator_type : String ( Ex - 'none' )
// }

// type alias ProfileInsert =
// { username : String
// , network_id : Number
// , first_name : String
// , last_name : String
// , description : String
// , location : String
// , followers_count : Number
// , friends_count : Number
// , account_created_at : String/Timestamp
// , profile_image_url : String
// , verified : Bool
// }

// type alias PostInsert =
// { post_id : Number
// , text : String
// , posted_at : Timestamp
// , is_reply : Bool
// , re_status_id : Number
// , re_network_user_id : Number
// , re_username : String
// }

// type alias PostInsertWithId =
// { post_id : Number
// , text : String
// , posted_at : Timestamp
// , is_reply : Bool
// , re_status_id : Number
// , re_network_user_id : Number
// , re_username : String
// , twitter_user_id : Number
// }

// type alias TwitterParams =
// { screen_name : String
// , count : Number
// }
