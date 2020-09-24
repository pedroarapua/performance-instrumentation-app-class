// NEWCODE
const pkg = require('../../../package.json');
const bunyan = require('bunyan');

const log = bunyan.createLogger({name: pkg.name});
module.exports = log;