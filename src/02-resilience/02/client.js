const got = require('got');
const url = process.env.URL || 'http://localhost:3000/shipping';
const maxRetryCount = 1;

function requestRetry () {
  return got(url, {
    retry: {
      limit: maxRetryCount
    }
  });
}

async function call() {
  try {
    const { body } = await requestRetry();
    console.info(`Result: OK, value => ${body}\n`)
  } catch (err) {
    console.error('Result: ERROR\n')
  }
}


setInterval(call, 5000);