const AddressBook       = require('../http/address-book.js');
const { httpsRequest }  = require('../http/requests.js');

// type_alias StockDetailsObject:
// {
//   "Status"          : String
//   "Name"            : String
//   "Symbol"          : String
//   "LastPrice"       : Int
//   "Change"          : Int
//   "ChangePercent"   : Int
//   "Timestamp"       : String ("Thu Apr 13 00:00:00 UTC-04:00 2017")
//   "MSDate"          : Int
//   "MarketCap"       : Int
//   "Volume"          : Int
//   "ChangeYTD"       : Int
//   "ChangePercentYTD": Int
//   "High"            : Int
//   "Low"             : Int
//   "Open"            : Int
// }

// getQuote :: String -> Promise StockDetailsObject
const getQuote = (stock_symbol) => {
  let url = AddressBook.makeMarketUrl(stock_symbol);
  return httpsRequest(url, "GET", "")
}

module.exports = {
  getQuote : getQuote
}
