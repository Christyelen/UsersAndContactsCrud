const { DataSource } = require('typeorm');

const { config } = require('./index.js');

module.exports = new DataSource(config);
