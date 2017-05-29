const R = require('ramda')
const Bluebird = require('bluebird')

const Knex     = require('./postgres/init.js')
const Postgres = require('./postgres/insert.js')
const Seed     = require('./twitter/seed.js')
const Twitter  = require('./twitter/index.js')

require('dotenv').config();
