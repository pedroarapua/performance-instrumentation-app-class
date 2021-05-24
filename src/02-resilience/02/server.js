const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
// variable to intercalate sucess / error
let counter = 0;

// route called by client
app.get('/shipping', (req, res) => {
  counter++;
  if(counter % 2 !== 0) {
    // fixed response
    const response = {
      price: 10
    };

    console.info('OK');
    res.send(JSON.stringify(response));
  } else {
    console.error('Something broke!')
    res.status(500).send('Something broke!');
  }
});

// start application server
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});