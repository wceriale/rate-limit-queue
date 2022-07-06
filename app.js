const express = require('express')
const RateLimiter = require('./RateLimiter.js');

const app = express()
const port = 3000

const apiUrl = 'https://catfact.ninja/fact';
const x = 5;
const y = 5;

const rateLimiter = new RateLimiter(apiUrl, x, y);

app.get('/request', (req, res) => {
  rateLimiter.issueRequest(function(result, err) {
    if (!err) {
      res.send(result + '\n');
    } else {
      console.log(err);
    }
  })
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})