const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOSTNAME || 'localhost';
const url = `http://${host}:${port}`;
// START NEW CODE
const isReturn200 = (process.env.IS_RETURN_200 || '1') == '1';
// END NEW CODE

app.use(express.json());

app.get('/shipping', (req, res) => {
  // START NEW CODE
  if(isReturn200) {
    const data = {
      data: {
        value: 100
      },
      meta: {
        server: url
      }
    };
  
    console.info(`SUCESS RESPONSE => ${JSON.stringify(data)}`)
    res.send(data);
  } else {
    console.error('ERROR RESPONSE => Alguma coisa ta errado')
    res.status(500).send('Alguma coisa ta errado');
  }
  // END NEW CODE
});

app.listen(port, () => {
  console.log(`App listening at ${url}`);
});