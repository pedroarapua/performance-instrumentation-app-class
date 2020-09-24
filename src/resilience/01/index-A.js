const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

/**
 * Function to generate random integer values between two numbers
 * @param {*} min - min value
 * @param {*} max - max value
 */
function getRandom(min = 0, max = 1) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// add root route to express
app.get('/', (req, res) => {
  const value = getRandom();
  
  if(value === 1) {
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