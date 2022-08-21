// START NEW CODE
const express = require('express');
const requestPromise = require('request-promise');
const app = express();
const port = process.env.PORT || 3001;
const nginxUrl = process.env.NGINX_URL || 'http://localhost:80';
const shippingUrl = `${nginxUrl}/shipping`;

async function requestRetry (retryCount = 0, maxRetryCount = 1) {
  
  retryCount++;
  let response;

  try {
    response = await requestPromise(shippingUrl);
  } catch(err) {
    if(retryCount <= maxRetryCount) {
      console.info(`Executando Retry ${retryCount}`);
      return await requestRetry(retryCount, maxRetryCount);
    } else {
      throw err;
    }
  }
  return response;
}

app.get('/get', async (req, res) => {
  try {
    const response = await requestRetry();
    console.info(`SUCESS RESPONSE => ${JSON.stringify(response)}`);
    res.send(response);
  } catch (err) {
    console.error('ERROR RESPONSE => Alguma coisa ta errado')
    res.status(500).send('Alguma coisa ta errado');
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

// END NEW CODE