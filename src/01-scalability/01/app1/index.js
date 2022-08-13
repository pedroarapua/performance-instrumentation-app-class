const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOSTNAME || 'localhost';
const url = `http://${host}:${port}`;

app.use(express.json());

app.get('/', (req, res) => {
  res.send(url);
});

app.listen(port, () => {
  console.log(`App listening at ${url}`);
});