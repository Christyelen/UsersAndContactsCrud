const { createAPILogger } = require('../utils/createAPILogger');

function setLogger(loggerName, req, res, next) {
  const apiLogger = createAPILogger(loggerName, req, res);
  req.logger = apiLogger;

  // Log Request
  req.logger.info('Log request.', {
    body: req.body,
    params: req.params,
    query: req.query,
    headers: req.headers,
  });

  return next();
}

module.exports = {
  setLogger,
};
