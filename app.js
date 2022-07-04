const express = require('express')
const axios = require('axios');
const limit = require("simple-rate-limiter");

const app = express()
const port = 3000

const apiUrl = 'https://catfact.ninja/fact';
const x = 2;
const y = 5;

const limitedRequest = limit(require("request")).to(x).per(y * 1000);

app.get('/request', (req, res) => {
  res.send('Hello World!')
  limitedRequest(apiUrl, function(err, res, body) {
    console.log(err);
    // console.log(res);
    console.log(body);
  });
//   axios.get(apiUrl).then(result => {
//     console.log(result.data.fact);
//     res.send(result.data.fact + '\n');
//   }).catch(error => {
//     console.error(error);
//     res.send(error);
//   });
//   res.end();
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})