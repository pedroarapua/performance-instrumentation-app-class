const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOSTNAME || 'localhost';
const url = `http://${host}:${port}`;

app.use(express.json());

app.get('/shipping', (req, res) => {
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
});

app.listen(port, () => {
  console.log(`App listening at ${url}`);
});