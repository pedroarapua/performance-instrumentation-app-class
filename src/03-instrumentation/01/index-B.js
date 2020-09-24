// set name application to differ apps in newrelic interface
process.env.APP_NAME = "index-B";

const newrelic = require('newrelic');
const express = require('express');
const got = require('got');
const redis = require("redis");
const util = require("util");
const CircuitBreaker = require('opossum');
const app = express();
const port = process.env.PORT || 3001;

const circuitBreakerOptions = {
  timeout: 5000,
  errorThresholdPercentage: 10,
  resetTimeout: 10000
};

const breaker = new CircuitBreaker(requestWithRetry, circuitBreakerOptions);
breaker.on('open', () => console.log(`OPEN: The breaker`));
breaker.on('halfOpen', () => console.log(`HALF_OPEN: The breaker`));
breaker.on('close', () => console.log(`CLOSE: The breaker`));
breaker.fallback(requestFallbackRedis);

const client = redis.createClient({ host: '127.0.0.1', port: 6379 });
const redisSetPromise = util.promisify(client.set).bind(client);
const redisGetPromise = util.promisify(client.get).bind(client)
const REDISCACHEKEY = 'get-api';

async function requestFallbackRedis () {
  let response = "OK fallback";
  try {
    const responseRedis = await redisGetPromise(REDISCACHEKEY);
    if(responseRedis) {
      response = JSON.parse(responseRedis);
    }
  } catch(err) {
    console.error('Error to get cache in Redis => ', err);
  }
  return response;
}

async function requestWithRetry () {
  const url = `http://localhost:${3000}/`;
  const { body } = await got(url, { retry: 1 });
  try {
    await redisSetPromise(REDISCACHEKEY, JSON.stringify(body));
  } catch(err) {
    console.error('Error to save cache in Redis => ', err);
  }

  return body;
}

async function requestWithCb () {
  return breaker.fire();
}

// add route to express
app.get('/', async (req, res) => {
  try {
    const response = await requestWithCb();

    res.send(response);
  } catch (err) {
    res.status(500).send('Something broke!');
  }
});

// start application server
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});