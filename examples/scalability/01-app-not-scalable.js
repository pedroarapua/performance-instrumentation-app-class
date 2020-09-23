const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
let items = [];

app.use(express.json());

app.post('/', (req, res) => {
  items.push(req.body);
  res.send(req.body);
});

app.get('/', (req, res) => {
  res.send(items);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});