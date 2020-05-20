const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.status(200).send('Init API');
});

app.listen(3000, () => {
  console.log('Started');
});