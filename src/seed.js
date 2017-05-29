'use strict'

require('dotenv').config();

const R        = require('ramda')
const Bluebird = require('bluebird')

const Knex     = require('./postgres/init.js')
const Postgres = require('./postgres/insert.js')
const Twitter  = require('./twitter/index.js')
const TwitterSeed = require('./twitter/user_seed.js')

const CLIENT  = Twitter.makeClient()
const MAX_CONCURRENCY = { concurrency: 3 }

// seed_twitter_users :: I/O
const seed_twitter_users = () => {
  console.log('Retrieving Twitter User Information and Saving to DB.')
  console.log('TWITTER_USERS', TWITTER_USERS)

  return Bluebird.map(
    TwitterSeed.TWITTER_USERS
  , Twitter.getUserDetails(CLIENT)
  , MAX_CONCURRENCY
  )
  .then( Postgres.saveUserDetails(Knex) )
  .then( (save_ids) => {
    console.log(`Initial Seed Complete! ${R.length(save_ids)} Rows Inserted.`)
    process.exit(0)
  })
  .catch((e) => console.log('Something went wrong during seed:', e))
}

seed_twitter_users()
