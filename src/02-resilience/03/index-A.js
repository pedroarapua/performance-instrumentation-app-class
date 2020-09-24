const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// add root route to express
app.get('/', (req, res) => {
  console.log('OK');
  res.send('OK');
});

// start application server
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});