// type alias TweetQueryReturn =
// { created_at: String
// , id : Number
// , id_str : String
// , text : String
// , truncated : Bool
// , entities:
//    { hashtags: [Object]
//    , symbols: List String
//    , user_mentions: [Object]
//    , urls: List String
//    , media: [Object]
//    }
// , extended_entities: { media: [Object] }
// , source : String
// , in_reply_to_status_id : null
// , in_reply_to_status_id_str : null
// , in_reply_to_user_id : null
// , in_reply_to_user_id_str : null
// , in_reply_to_screen_name : null
// , user : TwitterUser
// , geo : null
// , coordinates : null
// , place : null
// , contributors : null
// , retweeted_status : Object


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

// type alias InsertParameters =
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
