
const R      = require('ramda')
const Assert = require('assert');
const Stock  = require('../src/stock/index.js')

describe('Stock Retrieval & Manipulation Functions', () => {

  describe('#_containsStockTicket', () => {
    it('should return true if a 3-4 letter, capitalized word in string', () => {
      let sentence = "This is a great time to buy AAPL."
      Assert.equal(true, Stock._containsStockTicket(sentence))
    }),
    it('should return false if a 3-4 letter, capitalized word not in string', () => {
      let sentence = "This is a great time to buy bananas."
      Assert.equal(false, Stock._containsStockTicket(sentence))
    })
  }),

  describe('#postHasStockTicket()', () => {
    it('should return true if object with property `text` has stock ticket'
    +  'in the associated string', () => {

      let obj = { text: 'Consider purchasing MMM.' }
      Assert.equal(true, Stock.postHasStockTicket(obj))
    }),
    it('should return false if object with property `text` does not'
    +  'have a stock ticket in the associated string', () => {

      let obj = { text: 'Consider purchasing a new hat.' }
      Assert.equal(false, Stock.postHasStockTicket(obj))
    }),
    it('should return false if object is missing the property `text`', () => {
      let obj = { words: 'Consider purchasing a new hat.' }
      Assert.equal(false, Stock.postHasStockTicket(obj))
    })
  }),

  describe('#_getStockTickets()', () => {
    it('should return an array of capitalized words between 3-4 characters.', () => {
      let sentence = "AAPL is a strong bet, but AMZN is also stellar."
      let return_array = ['AAPL', 'AMZN']
      Assert.deepEqual(return_array, Stock._getStockTickets(sentence))
    }),
    it('should return an empty array if no stocks present.', () => {
      let sentence = "Coffee is a strong bet, but espresso is also stellar."
      let return_array = [ ]
      Assert.deepEqual(return_array, Stock._getStockTickets(sentence))
    })
  }),

  describe('#_getTicketsFromPost()', () => {
    it('should return an array of capitalized words between 3-4 characters'
    +  'when provided an object with the key `text`.', () => {
      let obj = { text: "AAPL is a strong bet, but AMZN is also stellar." }
      let return_array = ['AAPL', 'AMZN']
      Assert.deepEqual(return_array, Stock._getTicketsFromPost(obj))
    }),
    it('should return an empty array if no stocks present in text value of object.', () => {
      let obj = { text: "Coffee is a very good, but espresso is also stellar." }
      let return_array = [ ]
      Assert.deepEqual(return_array, Stock._getTicketsFromPost(obj))
    }),
    it('should return an empty array if no text key is present.', () => {
      let obj = { word: "Coffee is a very good, but espresso is also stellar." }
      let return_array = [ ]
      Assert.deepEqual(return_array, Stock._getTicketsFromPost(obj))
    })
  }),

  describe('#getPriceHistory()', () => {
    const START_DATE = '2017-06-01'
    const END_DATE = '2017-06-8'
    const NASDAQ = 'NASDAQ'

    const getStockHistoryKeys = (symbol) =>
      Stock.getPriceHistory(START_DATE, END_DATE, NASDAQ, symbol)
      .then(R.head)
      .then(R.keys)

    it('should return an array of stock details with specific keys', () => {
      let keys = ['date', 'open', 'high', 'low', 'close', 'volume', 'symbol']

      return getStockHistoryKeys('AAPL')
      .then((return_keys) => Assert.deepEqual(keys, return_keys))
    }),
    it('should return an empty array if no stock details exist.', () => {
      let empty_array = [ ]
      let bad_ticket = 'RDEN' //Company was acquired

      return getStockHistoryKeys(bad_ticket)
      .then((return_keys) => Assert.deepEqual(empty_array, return_keys))
    })
  }),

  describe('#getStandardHistory()', () => {
    const NASDAQ = 'NASDAQ'

    const getStockHistoryKeys = (symbol) =>
      Stock.getStandardHistory(NASDAQ, symbol)
      .then(R.head)
      .then(R.keys)

    it('should return an array of stock details with specific keys', () => {
      let keys = ['date', 'open', 'high', 'low', 'close', 'volume', 'symbol']

      return getStockHistoryKeys('AAPL')
      .then((return_keys) => Assert.deepEqual(keys, return_keys))
    }),
    it('should return an empty array if no stock details exist.', () => {
      let empty_array = [ ]
      let bad_ticket = 'BUYOOO'

      return getStockHistoryKeys(bad_ticket)
      .then((return_keys) => Assert.deepEqual(empty_array, return_keys))
    })
  })
})
