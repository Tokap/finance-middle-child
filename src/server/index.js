'use strict';

const express       = require('express');
const bodyParser    = require('body-parser');
const app           = express();
const dotenv        = require('dotenv').config();
const { getQuote }  = require('../stock-tickets/index.js');

const PORT = 3300;

// -------------------------------------------------------------
// -------- The Server
// -------------------------------------------------------------
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/sys/alive', (req, res) => {
  res.send({ status: "More work? Zug zug." });
})

app.get('/quote/:symbol', (req, res) => {
  let symbol = req.params.symbol;
  getQuote(symbol)
  .then( (quote_details) => res.send(quote_details) )
})

app.get('/price/:symbol', (req, res) => {
  let symbol = req.params.symbol;
  getQuote(symbol)
  .then( (quote_details) => {
    let quote = JSON.parse(quote_details);
    res.json(quote["LastPrice"])
  })
})

const startServer = () => {
  console.log(`Listening on Port: ${PORT}`);
  app.listen(PORT);
}

startServer();
