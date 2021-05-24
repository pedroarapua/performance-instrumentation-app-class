const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// route called by client
app.get('/shipping', (req, res) => {
  const response = {
    price: 10
  };

  console.info('OK');
  res.send(JSON.stringify(response));
});

// start application server
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});