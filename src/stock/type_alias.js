// Timestamp Format Example: 2017-05-10T08:31:03.000Z
//
// FullSymbol Format Example: 'NYSE:aapl' : String
//
// type_alias: StoredTwitterPost =
// { id: Number
// , twitter_user_id: String
// , post_id: String
// , text: String
// , is_reply: Bool
// , re_status_id: String
// , re_network_user_id: String
// , re_username: String
// , posted_at: Timestamp
// , created_at: Timestamp
// , updated_at: Timestamp
// , deleted: Bool
// , deleted_at: Timestamp
// }
//
// type_alias: StockPriceApi =
// { date: Timestamp
// , open: Float
// , high: Float
// , low: Float
// , close: Float
// , volume: Number
// , symbol: FullSymbol
// }
// type_alias: StockPriceInsert =
// { date: Timestamp
// , open: Float
// , high: Float
// , low: Float
// , close: Float
// , volume: Number
// , stock_ticket_id: Number
// }
//
// type_alias: StockCompany =
// { symbol: String
// , exchange: String
// , company: String
// }

// type_alias: StockCompanyWithId =
// { symbol: String
// , exchange: String
// , company: String
// , stock_ticket_id: String
// }
