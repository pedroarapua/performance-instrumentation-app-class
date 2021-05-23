const got = require('got');
const url = process.env.URL || 'http://localhost:3000/';
const maxRetryCount = 1;

async function requestRetry (retryCount = 0) {
  await got(url, { 
    retry: {
      limit: maxRetryCount,
      calculateDelay: () => 1000
    }
  });
}

async function call() {
  try {
    await requestRetry();
    console.info('Result: OK\n')
  } catch (err) {
    console.error('Result: ERROR\n')
  }
}


setInterval(call, 5000);