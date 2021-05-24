const requestPromise = require('request-promise');
const url = process.env.URL || 'http://localhost:3000/shipping';
const maxRetryCount = 1;

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function requestRetry (retryCount = 0) {
  retryCount++;
  let response;
  
  try {
    response = await requestPromise(url);
    console.info(`Success request ${retryCount}`);
  } catch(err) {
    console.info(`Failed request ${retryCount}`);
    if(retryCount <= maxRetryCount) {
      await sleep(1000);
      response = await requestRetry(retryCount);
    } else {
      throw err;
    }
  }

  return response;
}

async function call() {
  try {
    const response = await requestRetry();
    console.info(`Result: OK, value => ${response}\n`)
  } catch (err) {
    console.error('Result: ERROR\n')
  }
}


setInterval(call, 5000);