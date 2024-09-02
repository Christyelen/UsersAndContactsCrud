const { response } = require('express');
const { REQUEST_ID_HEADER } = require('../consts/index.js');

response.flatResponse = function (requestId, httpStatusCode, data = {}) {
  this.setHeader(REQUEST_ID_HEADER, requestId);
  this.responseSent = true;
  return this.status(httpStatusCode).json(data);
};
