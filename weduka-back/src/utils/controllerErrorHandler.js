const { APIError } = require('./APIError');

/**
 * Main controller Error Catcher
 * @param fn
 * @returns
 */
const controllerErrorHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((controllerError) => {
    req.logger.error(controllerError, {
      message: 'Unexpected server error',
    });

    const customError = new APIError(500, 'Raw', 'Unexpected server error', [controllerError.message]);
    return next(customError);
  });
};

module.exports = {
  controllerErrorHandler,
};
