const util = require('util');
// http client library
const got = require('got');
// circuit breaker library
const CircuitBreaker = require('opossum');
// redis library
const redis = require("redis");

const url = process.env.URL || 'http://localhost:3000/shipping';
const maxRetryCount = 1;

// client redis
const redisClient = redis.createClient({ host: '127.0.0.1', port: 6379 });
// transform redis functions in promises
const redisSetPromise = util.promisify(redisClient.set).bind(redisClient);
const redisGetPromise = util.promisify(redisClient.get).bind(redisClient);
const redisExpirePromise = util.promisify(redisClient.expire).bind(redisClient);
// redis cache key
const REDISCACHEKEY = 'get-shipping-api';

// circuit breaker configuration
const circuitBreakerOptions = {
  timeout: 5000, // cb timeout
  volumeThreshold: 5, // minimum request to check if it can be open
  errorThresholdPercentage: 40, // error percentage to open circuit breaker
  rollingCountTimeout: 60000, // window time(ms) to keep statistics 
  resetTimeout: 15000 // wait time(ms) to return to halfopen state
};
// circuit breaker instance
const breaker = new CircuitBreaker(requestRetry, circuitBreakerOptions);
// listening events of circuit breaker
breaker.on('open', () => console.info(`OPEN: The breaker`));
breaker.on('halfOpen', () => console.info(`HALF_OPEN: The breaker`));
breaker.on('close', () => console.info(`CLOSE: The breaker`));
// fallback implementation
breaker.fallback(async () => {
  console.info('fallback executed');
  
  let response = {
    body: JSON.stringify({
      price: 20
    })
  };

  try {
    // get cache information in redis
    const responseRedis = await redisGetPromise(REDISCACHEKEY);
    if(responseRedis) {
      response = JSON.parse(responseRedis);
    }
  } catch(err) {
    console.error('Error to get cache in Redis => ', err);
  }
  return response;
});

async function requestRetry () {
  const { body } = await got(url, { 
    retry: {
      limit: maxRetryCount
    }
  });
  
  try {
    // save last request information in cache
    await redisSetPromise(REDISCACHEKEY, JSON.stringify({ body }));
    // set ttl (seconds) to expiration
    await redisExpirePromise(REDISCACHEKEY, 20);
  } catch(err) {
    // don't throw error, it isn't blocking
    console.error('Error to save cache in Redis => ', err);
  }

  return { body };
}

async function call() {
  try {
    const { body } = await breaker.fire();
    console.info(`Result: OK, value => ${body}\n`)
  } catch (err) {
    console.error('Result: ERROR\n')
  }
}


setInterval(call, 5000);