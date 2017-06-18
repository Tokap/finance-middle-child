'use strict'

require('dotenv').config()

const Knex = require('knex')

const DB_NAME = 'application_data'


const _conn = {
  host: process.env.POSTGRES_HOST
, port: process.env.POSTGRES_PORT
, database: DB_NAME
, user: process.env.POSTGRES_USER
, password: process.env.POSTGRES_PW
};

const _knexConfig = {
  client: 'pg'
, version: 9.6
, connection: _conn
};

const knex = Knex(_knexConfig);

module.exports = knex
