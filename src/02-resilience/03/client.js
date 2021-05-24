// http client library
const got = require('got');
// circuit breaker library
const CircuitBreaker = require('opossum');

const url = process.env.URL || 'http://localhost:3000/shipping';
const maxRetryCount = 1;

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
breaker.fallback(() => {
  console.info('fallback executed');
  const defaultResponse = {
    body: JSON.stringify({
      price: 20
    })
  };

  return Promise.resolve(defaultResponse);
});

function requestRetry () {
  return got(url, { 
    retry: {
      limit: maxRetryCount
    }
  });
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