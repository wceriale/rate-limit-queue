# rate-limit-queue

Basic rate limiter implementation. Supports sending 0 arg get requests.

Install dependencies with:
`yarn install`

Change x/y/api in the app.js file.

Run server in background with:
`node app.js`

use bash script in different terminal to send X number of requests:
`./send_requests.sh 15` (sends 15 requests concurrently)

hit `http://localhost:3000/request` to query.
