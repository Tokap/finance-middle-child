
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
  }),

  describe('#validateStockTicket()', () => {
    it('should return true if stock ticket is valid', () => {

      return Stock.validateStockTicket('AAPL')
      .then((bool) => Assert.equal(true, bool))
    }),
    it('should return false if stock ticket is invalid', () => {
      let bad_ticket = 'BUYOOO'

      return Stock.validateStockTicket(bad_ticket)
      .then((bool) => Assert.equal(false, bool))
    })
  }),

  describe('#_validPostOrNull() & #validateTicketsInPosts()', () => {
    const valid_post =
      { id: 12
      , twitter_user_id: '8675309'
      , post_id: '872460198228742100'
      , text: 'Test text is good and has a stock ticket like AAPL.'
      , is_reply: true
      , re_status_id: '872458703529812000'
      , re_network_user_id: '7890'
      , re_username: 'test_username'
      , posted_at: '2017-06-07 07:28:15'
      , created_at: '2017-06-07 09:38:34.729475'
      , updated_at: '2017-06-07 09:38:34.729475'
      , deleted: false
      , deleted_at: null
      }

    const invalid_post =
      { id: 12
      , twitter_user_id: '8675309'
      , post_id: '872460198228742100'
      , text: 'Test text is good and has a stock ticket like BUYOOO.'
      , is_reply: true
      , re_status_id: '872458703529812000'
      , re_network_user_id: '7890'
      , re_username: 'test_username'
      , posted_at: '2017-06-07 07:28:15'
      , created_at: '2017-06-07 09:38:34.729475'
      , updated_at: '2017-06-07 09:38:34.729475'
      , deleted: false
      , deleted_at: null
      }

    const post_list  = [valid_post, invalid_post]
    const valid_list = [valid_post]


    it('should return the original post if it contains a valid stock ticket', () =>
      Stock._validPostOrNull(valid_post)
      .then((post_or_null) => Assert.equal(valid_post, post_or_null))
    ),
    it('should return null if the post contains an invalid stock ticket', () =>
      Stock._validPostOrNull(invalid_post)
      .then((post_or_null) => Assert.equal(null, post_or_null))
    ),
    it('should return only valid posts from a list', () =>
      Stock.validateTicketsInPosts(post_list)
      .then((filtered_list) => Assert.deepEqual(valid_list, filtered_list))
    )
  }),

  describe('#getNews()', () => {
    const NASDAQ = 'NASDAQ'

    const getStockNewsKeys = (symbol) =>
      Stock.getNews(NASDAQ, symbol)
      .then(R.head)
      .then(R.keys)

    const keys =
      [ 'guid'
      , 'symbol'
      , 'title'
      , 'description'
      , 'summary'
      , 'date'
      , 'link'
      ]

    it('should return an array of recent stock news', () =>
      getStockNewsKeys('AAPL')
      .then((return_keys) => Assert.deepEqual(keys, return_keys))
    )
  })
})
