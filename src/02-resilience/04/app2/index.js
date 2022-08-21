const express = require('express');
const requestPromise = require('request-promise');
const app = express();
const port = process.env.PORT || 3001;
const nginxUrl = process.env.NGINX_URL || 'http://localhost:80';
const shippingUrl = `${nginxUrl}/shipping`;
const got = require('got');

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
breaker.fallback(requestFallbackRedis); // MODIFIED CODE

// START NEW CODE
const redis = require("redis");
const redisHost = process.env.REDIS_HOST || 'localhost';
const redisPort = process.env.REDIS_PORT || 6379;
const client = redis.createClient({ 
  url: `redis://${redisHost}:${redisPort}`,
  disableOfflineQueue: true
});
client.on('error', (err) => console.log('Redis Client Error', err));
client.connect().then(() => console.log('Redis Conectado'));
const REDISCACHEKEY = 'get-api';

async function requestFallbackRedis () {
  console.info('Fallback Executado');
  let response = {
    data: {
      value: 100
    },
    meta: {
      server: 'localhost'
    }
  };

  try {
    const responseRedis = await client.get(REDISCACHEKEY);
    if(responseRedis) {
      console.info('Retornando Fallback através do redis');
      response = JSON.parse(responseRedis);
    }
  } catch(err) {
    console.error('Error to get cache in Redis => ', err);
  }
  return response;
}

// END NEW CODE

// START MODIFIED CODE

async function requestRetry (maxRetryCount = 1) {
  console.info('Executando Request Api');
  let response;
  try {
    response = await got(shippingUrl, { retry: maxRetryCount }).json();
  } catch(err) {
    console.error('Error to request /shipping => ', err);
    throw err;
  }
  
  try {
    await client.set(REDISCACHEKEY, JSON.stringify(response));
  } catch(err) {
    console.error('Error to save cache in Redis => ', err);
  }

  return response;
}

// END MODIFIED CODE

app.get('/get', async (req, res) => {
  try {
    const response = await breaker.fire();
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