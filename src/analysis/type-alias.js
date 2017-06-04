
// Timestamp Format Example: 2017-05-10T08:31:03.000Z

// FullSymbol Format Example: 'NYSE:aapl'

type_alias: StoredTwitterPost =
{ id: Number
, twitter_user_id: String
, post_id: String
, text: String
, is_reply: Bool
, re_status_id: String
, re_network_user_id: String
, re_username: String
, posted_at: Timestamp
, created_at: Timestamp
, updated_at: Timestamp
, deleted: Bool
, deleted_at: Timestamp
}

type_alias: StockDetailsApi =
{ date: Timestamp
, open: Float
, high: Float
, low: Float
, close: Float
, volume: Number
, symbol: FullSymbol
}
