const express = require('express');
const requestPromise = require('request-promise');
const app = express();
const port = process.env.PORT || 3001;
const nginxUrl = process.env.NGINX_URL || 'http://localhost:80';
const shippingUrl = `${nginxUrl}/shipping`;
// START NEW CODE
const got = require('got');
// END NEW CODE

// START MODIFIED CODE
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
// END MODIFIED CODE

app.get('/get', async (req, res) => {
  try {
    const response = await requestRetry();
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