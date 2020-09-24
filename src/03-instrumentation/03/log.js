const pkg = require('../../../package.json');
const bunyan = require('bunyan');
//NEWCODE
const bunyantcp = require('bunyan-logstash-tcp');

const log = bunyan.createLogger({
  name: pkg.name,
  //NEWCODE
  streams: [
    {
      stream: process.stdout
    },
    {
      type: "raw",
      stream: bunyantcp.createStream({
          host: '127.0.0.1',
          port: 5000
      })
    }
  ]
});
module.exports = log;