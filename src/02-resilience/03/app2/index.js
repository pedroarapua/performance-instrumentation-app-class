const express = require('express');
const requestPromise = require('request-promise');
const app = express();
const port = process.env.PORT || 3001;
const nginxUrl = process.env.NGINX_URL || 'http://localhost:80';
const shippingUrl = `${nginxUrl}/shipping`;
const got = require('got');
// START NEW CODE
const CircuitBreaker = require('opossum');

const circuitBreakerOptions = {
  timeout: 5000,
  errorThresholdPercentage: 10,
  resetTimeout: 10000
};

const breaker = new CircuitBreaker(requestRetry, circuitBreakerOptions);
breaker.on('open', () => console.log(`OPEN: The breaker`));
breaker.on('halfOpen', () => console.log(`HALF_OPEN: The breaker`));
breaker.on('close', () => console.log(`CLOSE: The breaker`));

breaker.fallback(() => {
  console.info('Fallback Executado');
  return {
    data: {
      value: 100
    },
    meta: {
      server: 'localhost'
    }
  };
});
// END NEW CODE

async function requestRetry (maxRetryCount = 1) {
  let response;
  try {
    response = await got(shippingUrl, { retry: maxRetryCount }).json();
  } catch(err) {
    console.error('Error to request /shipping => ', err);
    throw err;
  }
  return response
}

app.get('/get', async (req, res) => {
  try {
    const response = await breaker.fire(); // CODE MODIFIED
    console.info(`response => ${JSON.stringify(response)}`);
    res.send(response);
  } catch (err) {
    console.error('Alguma coisa ta errado');
    res.status(500).send('Alguma coisa ta errado');
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});