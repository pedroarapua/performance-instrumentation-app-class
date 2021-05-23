const requestPromise = require('request-promise');
const url = process.env.URL || 'http://localhost:3000/';
const maxRetryCount = 1;

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function requestRetry (retryCount = 0) {
  retryCount++;
  
  try {
    await requestPromise(url);
    console.info(`Success request ${retryCount}`);
  } catch(err) {
    console.info(`Failed request ${retryCount}`);
    if(retryCount <= maxRetryCount) {
      await sleep(1000);
      await requestRetry(retryCount);
    } else {
      throw err;
    }
  }
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