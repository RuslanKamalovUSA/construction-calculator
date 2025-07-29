const express = require('express');
const request = require('request');
const app = express();
const port = 3003;

// Прокси-эндпойнт для API
app.get('/api/rates', (req, res) => {
  const apiUrl = 'https://open.er-api.com/v6/latest/USD';
  request(apiUrl).pipe(res);
});


app.listen(port, () => {
  console.log(`Proxy server running at http://localhost:${port}`);
});    