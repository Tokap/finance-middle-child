'use strict';

const express            = require('express')
const bodyParser         = require('body-parser');
const app                = express();
const dotenv             = require('dotenv').config();

const PORT = 47700;

// -------------------------------------------------------------
// -------- The Server
// -------------------------------------------------------------
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/sys/alive', (req, res) => {
  res.send({ status: "More work? Zug zug." });
})

const startServer = () => {
  console.log(`Sys Alive Listening on Port: ${PORT}`);
  app.listen(PORT);
}

startServer();
