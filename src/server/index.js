'use strict';

require('dotenv').config();

const R             = require('ramda')
const Express       = require('express');
const BodyParser    = require('body-parser');
const App           = Express();

const Knex          = require('../postgres/init.js')
const PgGet         = require('../postgres/get.js')

const PORT = 3300;

const sendJson = R.curry( (res, body) => res.json(body) )
// ----------------------------------------------------------------------
// --------------------------- The Server -------------------------------
// ----------------------------------------------------------------------
App.use(BodyParser.urlencoded({ extended: true }));
App.use(BodyParser.json());

App.get('/sys/alive', (req, res) => {
  res.send({ status: "Server is running." });
})

App.get('/username/:username', (req, res) =>
  PgGet.getTwitterUserByUsername(Knex, req.params.username)
  .then(sendJson(res))
  .catch((e) => console.log('Server Error: ', e))
)

App.get('/twitter_user_id/:user_id', (req, res) =>
  PgGet.getTwitterUserById(Knex, req.params.user_id)
  .then(sendJson(res))
  .catch((e) => console.log('Server Error: ', e))
)

App.get('/twitter_post/:post_id', (req, res) =>
  PgGet.getTwitterPostById(Knex, req.params.post_id)
  .then(sendJson(res))
  .catch((e) => console.log('Server Error: ', e))
)

App.get('/user/:user_id/posts', (req, res) =>
  PgGet.getTwitterPostsByUserId(Knex, req.params.user_id)
  .then(sendJson(res))
  .catch((e) => console.log('Server Error: ', e))
)

App.get('/stock/:stock_id', (req, res) =>
  PgGet.getStockById(Knex, req.params.stock_id)
  .then(sendJson(res))
  .catch((e) => console.log('Server Error: ', e))
)

App.get('/stocks', (req, res) =>
  PgGet.getAllStocks(Knex)
  .then(sendJson(res))
  .catch((e) => console.log('Server Error: ', e))
)

App.get('/stock/:stock_id/history', (req, res) =>
  PgGet.getStockHistoryByStockId(Knex, req.params.stock_id)
  .then(sendJson(res))
  .catch((e) => console.log('Server Error: ', e))
)

App.get('/history/:symbol', (req, res) =>
  PgGet.getStockHistoryBySymbol(Knex, req.params.symbol)
  .then(sendJson(res))
  .catch((e) => console.log('Server Error: ', e))
)

const startServer = () => {
  console.log(`Listening on Port: ${PORT}`);
  App.listen(PORT);
}

startServer();
