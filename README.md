# rate-limit-queue

Basic rate limiter implementation. Only supports sending basic get requests.

Install dependencies with:
`yarn install`

Run server with:
`node app.js`

Change x/y/api in the app.js file.

use bash script to send X number of requests:
`./send_requests.sh 15` (sends 15 requests concurrently)

hit `http://localhost:3000/request` to query.
