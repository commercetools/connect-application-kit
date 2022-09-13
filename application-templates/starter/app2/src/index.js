const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World! This is app2');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
