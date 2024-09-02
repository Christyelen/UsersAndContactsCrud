const { createLogger, stdSerializers } = require('bunyan');

function createAPILogger(name, req, res) {
  const logger = createLogger({
    name,
    serializers: {
      req: reqSerializer,
      res: stdSerializers.res,
      err: errSerializer,
    },
    level: 'info',
  });

  return {
    info: (message, data) => {
      return logger.info({ req, res, message, data });
    },
    fatal: (err) => {
      return logger.fatal({ req, res, err });
    },
    error: (err, data) => {
      return logger.error({ req, res, err, data });
    },
    warn: (message, data) => {
      return logger.warn({ req, res, message, ...data });
    },
    trace: (message, data) => {
      return logger.trace({ req, res, message, ...data });
    },
    debug: (message, data) => {
      return logger.debug({ req, res, message, ...data });
    },
    getChild: (name) => {
      const childLogger = logger.child({
        widget_type: name,
        serializers: {
          req: reqSerializer,
          res: stdSerializers.res,
          err: errSerializer,
        },
      });

      return {
        info: (...params) => {
          childLogger.info({ req, res, ...params });
        },
        fatal: (...params) => {
          childLogger.fatal({ req, res, ...params });
        },
        error: (...params) => {
          childLogger.error({ req, res, ...params });
        },
        warn: (...params) => {
          childLogger.warn({ req, res, ...params });
        },
        trace: (...params) => {
          childLogger.trace({ req, res, ...params });
        },
        debug: (...params) => {
          childLogger.debug({ req, res, ...params });
        },
        getFlatLogger: () => {
          return childLogger;
        },
      };
    },
    getFlatLogger: () => {
      return logger;
    },
  };
}

function reqSerializer(req) {
  return {
    host: `${req.protocol}://${req.get('host')}`,
    origin: req?.get('origin') ?? req.get('host'),
    requestId: req.id,
    path: req.originalUrl,
    method: req.method,
    realIp: req.ip,
    traceId: req?.get('x-amzn-trace-id') || 'Unkown',
    timedOut: req.timedout ?? false,
    userAgent: req?.get('User-Agent') ?? 'Unkown',
  };
}

function errSerializer(err) {
  return {
    message: err.message,
    name: err.name,
    stack: err.stack,
  };
}

module.exports = {
  createAPILogger,
};
