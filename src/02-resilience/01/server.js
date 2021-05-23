const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
// variable to intercalate sucess / error
let counter = 0;

// route called by client
app.get('/', (req, res) => {
  counter++;
  if(counter % 2 !== 0) {
    console.info('OK')
    res.send('OK');
  } else {
    console.error('Something broke!')
    res.status(500).send('Something broke!');
  }
});

// start application server
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});