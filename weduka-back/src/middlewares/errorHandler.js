const { APIError } = require('../utils/APIError');

const errorHandler = (err, req, res, next) => {
  if (req && req.logger) {
    req.logger.error(err);
  }

  if (err instanceof SyntaxError) {
    return res.status(400).json({
      error: true,
      message: err.message,
    });
  }

  if (req.timedout) {
    err = new APIError(408, 'The server failed to fullfil this request in time.', null);
  }

  const statusCode = err?.HttpStatusCode || 500;
  const errBody = err?.JSON ? { ...err.JSON } : { error: true };

  return res.status(statusCode).json(errBody);
};

module.exports = {
  errorHandler,
};
