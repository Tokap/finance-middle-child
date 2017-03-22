'use strict';

const R       = require('ramda')
const Request = require('request-promise');

const MYSQL_GET_ONE = process.env.MYSQL_GET_ONE;


// let options = {
//   method: 'POST',
//   uri: 'https://api.github.com/user/repos',
//   headers: {
//       'User-Agent': 'application/json'
//   },
//   body: {
//     some: 'payload'
//   },
//   json: true // Automatically parses the JSON string in the response
// };


// httpsRequest :: String -> String -> Object -> HttpReply
const httpsRequest = R.curry( (url, method, body) => {

  let options = {
    method: method
  , uri: url
  , headers: { 'User-Agent': 'application/json' }
  , body: body
  };

  return Request(options)
  .then(  (res) => console.log("RESPONSE_ : ", res) )
  .catch( (err) => console.error(err) )

})

httpsRequest('http://www.google.com', "GET", "")

module.exports = {
  httpsRequest : httpsRequest
}
