require('dotenv').config();

const Postgres = require('pg-promise')();
const knex = require('knex')

const conn = {
  host: process.env.POSTGRES_HOST
, port: process.env.POSTGRES_PORT
, database: process.env.POSTGRES_MAIN_DB
, user: process.env.POSTGRES_USER
, password: process.env.POSTGRES_PW
};

const db = Postgres(conn);

// return db.one('SELECT * FROM test_table')
// .then( (rez) => console.log('Hey! An Outcome!', rez))
// .catch((e) => console.log('Error During DB Conn: ', e))


// The below also works
const knexConfig = {
  client: 'pg'
, version: 9.6
, connection: conn
}

const knexDbConn = knex(knexConfig)

// knexDbConn.select('name').from('test_table')
// .then( (rez) => console.log(rez[0].name))

knexDbConn.schema.createTableIfNotExists('twitter_post', (table) => {
  table.increments('id');
  table.string('username');
  table.string('post');
  table.string('mood');
  table.timestamps();
})
.then(console.log('A thing!'))
