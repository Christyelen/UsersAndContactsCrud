const { nanoid } = require('nanoid');
const { REQUEST_ID_HEADER } = require('../consts/index');

function assignRequestId({ headerName = REQUEST_ID_HEADER, setHeader = true } = {}) {
  return function (request, response, next) {
    const requestId = nanoid();

    if (setHeader) {
      response.set(headerName, requestId);
    }

    request.id = requestId;

    next();
  };
}

module.exports = {
  assignRequestId,
};
