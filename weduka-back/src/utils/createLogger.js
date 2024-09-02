const { createLogger: createBunyanLogger } = require('bunyan');

function createLogger(name) {
  const level = 'info';

  const logger = createBunyanLogger({
    name,
    level: level,
  });

  return {
    info: (...params) => {
      logger.info({ ...params });
    },
    fatal: (...params) => {
      logger.fatal({ ...params });
    },
    error: (...params) => {
      logger.error({ ...params });
    },
    warn: (...params) => {
      logger.warn({ ...params });
    },
    trace: (...params) => {
      logger.trace({ ...params });
    },
    debug: (...params) => {
      logger.debug({ ...params });
    },
    getFlatLogger: () => {
      return logger;
    },
  };
}

module.exports = {
  createLogger,
};
