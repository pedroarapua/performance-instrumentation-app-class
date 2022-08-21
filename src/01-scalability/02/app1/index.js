const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOSTNAME || 'localhost';
const url = `http://${host}:${port}`;

app.use(express.json());

app.get('/shipping', (req, res) => {
  res.send({
    data: {
      value: 100
    },
    meta: {
      server: url
    }
  });
});

app.listen(port, () => {
  console.log(`App listening at ${url}`);
});