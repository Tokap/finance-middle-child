'use strict'

require('dotenv').config();

const R        = require('ramda')
const Bluebird = require('bluebird')

const Knex     = require('./postgres/init.js')
const PgInsert = require('./postgres/insert.js')
const PgGet    = require('./postgres/get.js')
const Twitter  = require('./twitter/index.js')
const TwitterSeed = require('./twitter/user_seed.js')

const CLIENT  = Twitter.makeClient()
const MAX_CONCURRENCY = { concurrency: 3 }

// _getRecentTweets :: TwitterClient -> UserDetails -> FullProfileInsert
const _getRecentTweets = R.curry( (client, user_detail) => {
  let user_id = R.prop('id', user_detail)
  let username = R.prop('username', user_detail)

  // return Twitter.getRecentTweets(client, username)
  return Twitter.getRecentTweets(client, username)
  .then(R.map(R.assoc('twitter_user_id', user_id)))
})

// getPostsForUserList :: Knex -> TwitterClient -> Object -> List (List Number)
const getPostsForUserList = (knex, twitter_client, concurrency) =>
  PgGet.getUserQueryDetails(knex)
  .then( (user_details) =>
    Bluebird.map(
      user_details
    , _getRecentTweets(twitter_client)
    , concurrency // Required to avoid API limit
    )
  )
  .then( (list_of_post_lists) =>
    Bluebird.map(
      list_of_post_lists
    , PgInsert.savePostDetails(knex)
    )
  )

// seedTwitterPosts :: I/O
const seedTwitterPosts = () => {
  console.log('Retrieving Twitter Posts and Saving to DB.')

  getPostsForUserList(Knex, CLIENT, MAX_CONCURRENCY)
  .then( (save_ids) => {
    console.log(`Twitter Posts Saved!`)
    process.exit(0)
  })
  .catch((e) => console.log('Something went wrong during post retreival:', e))
}

seedTwitterPosts()
