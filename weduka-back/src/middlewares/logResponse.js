const logResponseBody = (req, res, next) => {
  const oldWrite = res.write;
  const oldEnd = res.end;

  const chunks = [];

  res.write = (chunk, ...args) => {
    chunks.push(chunk);
    return oldWrite.apply(res, [chunk, ...args]);
  };

  res.end = (chunk, ...args) => {
    try {
      if (chunk) {
        chunks.push(Buffer.from(chunk));
      }
      const body = Buffer.concat(chunks).toString('utf8');

      if (req.logger) {
        req.logger.info(`Logging Response ${req.id}`, {
          body,
        });
      }
      return oldEnd.apply(res, [chunk, ...args]);
    } catch (error) {
      console.error(error);
      return;
    }
  };

  next();
};

module.exports = {
  logResponseBody,
};
