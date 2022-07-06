const axios = require('axios');

// Rate limiter class using a simplified token bucket algorithm. 
// 
// - Start with X tokens, each request consumes 1 token. 
// - Requests will not be sent if there are no remaining tokens, they'll be queue'd up and must wait for token refresh.
// - After time Y seconds has passed from the initial request, reset the count of tokens to X. 
// 
// See https://en.wikipedia.org/wiki/Token_bucket for more details.
class RateLimiter {

    // queue of requests to send.
    requestQueue = [];

    // debug counter, used to see how many requests have been sent.
    sentCounter = 0;

    constructor(api, x, y) {
        this.api = api;
        this.maxTokens = x;
        this.currTokens = x;
        this.interval = y;
        this.timerSet = false;
        console.log(this);
    }

    // Callback must accept data and error params.
    issueRequest(callback) {
        var requestToSend = () => {
            axios.get(this.api).then(result => {
                callback(result.data.fact, null);
            }).catch(error => {
                callback(null, error);
            });
        };
        this.requestQueue.push(requestToSend);

        if (!this.timerSet) {
            this.setTimer();
        }
        this.sendRequest();
    }


    // Sets the timer to refill tokens after the inverval time has passed.
    // TODO: make private.
    setTimer() {
        this.timerSet = true;

        // Reset number of tokens after interval.
        // SetTimeout function must wait for the thread (node.js is singlethreaded) to sleep before executing, this means we don't need to worry
        // about data races for the currTokens field. 
        setTimeout(() => { 
            this.currTokens = this.maxTokens; 

            // After the tokens are reset, fire off as many from the queue as possible.
            while (this.currTokens > 0 && this.requestQueue.length > 0) {
                this.sendRequest();
            }

            if (this.requestQueue.length > 0) {
                // We ran out of tokens, but still have requests. setTimer again.
                this.setTimer();
            } else {
                // We got through all the requests, indicate no timer is set.
                this.timerSet = false;
            }
        }, this.interval * 1000);

    }

    // function to pop the queue and send the request if tokens are available.
    // TODO: make private.
    sendRequest () {
        if (this.currTokens > 0 && this.requestQueue.length > 0) {
            this.currTokens--;
            this.requestQueue.pop()();
            this.sentCounter++;
            console.log('requests sent: ' + this.sentCounter);
        }
    }

}

module.exports = RateLimiter;