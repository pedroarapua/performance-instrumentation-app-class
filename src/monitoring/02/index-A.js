// set name application to differ apps in newrelic interface
process.env.APP_NAME = "index-A";
// NEWCODE
const log = require('./log');
const newrelic = require('newrelic');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// add root route to express
app.get('/', (req, res) => {
  // NEWCODE
  log.info('OK');
  res.send('OK');
});

// add root route to express
app.get('/error', (req, res) => {
  // NEWCODE
  log.error('Something broke!');
  res.status(500).send('Something broke!');
});

// start application server
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});