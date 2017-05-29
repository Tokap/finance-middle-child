const R = require('ramda')

const Tables = require('./tables.js')
const Knex = require('./init.js')

const saveUserDetails = R.curry( (knex, params) =>
  knex.insert(params, 'id').into(Tables.twitter_user)
)

// const test = { username : 'Dikran'
// , network_id : 1234567
// , first_name : 'Dikran'
// , last_name : 'Vaz'
// , description : 'Pretty cool actually'
// , location : 'New York, New York'
// , followers_count : 5
// , friends_count : 1
// , account_created_at : 'Sat May 20 05:51:43 +0000 2017'
// , profile_image_url : 'http://abs.twimg.com/images/themes/theme1/bg.png'
// , verified : false
// }
//
// saveUserDetails(Knex, test)
// .then( (rez) => console.log('result is: ', rez))

module.exports = {
  saveUserDetails
}
