require('reflect-metadata');
const bodyParser = require('body-parser');
const timeout = require('connect-timeout');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

// eslint-disable-next-line import/order
const appConfig = require('./appConfig/index.js');

require('./utils/flatResponse.js');
const { logResponseBody } = require('./middlewares/logResponse.js');
const { setLogger } = require('./middlewares/setLogger.js');
const { assignRequestId } = require('./middlewares/assignRequestId.js');
const { errorHandler } = require('./middlewares/errorHandler.js');

const routes = require('./routes/index.js');
const { createLogger } = require('./utils/createLogger.js');
const { dbCreateConnection } = require('./models/config/index.js');

const logger = createLogger('app');

const app = express();

app.use(
  morgan('tiny', {
    skip: (req, res) => {
      const rootUrl = req.url === '/';
      return req.originalUrl.includes('healthcheck') || rootUrl;
    },
  }),
);

app.use(cors());
app.use(helmet());
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.set('trust proxy', 1);
app.use(logResponseBody);
app.use(assignRequestId());

app.use(timeout(appConfig.baseTimeout));
app.use(setLogger.bind(setLogger, 'v1-weduka-api'));

// CRUD
// Users: create, delete, update and list
// Contacts: create, delete, update
app.use('/', routes);
app.use(errorHandler);

(async () => {
  logger.info('Starting application.');

  logger.info('Connecting to database');
  const dbConnection = await dbCreateConnection();

  if (!dbConnection || !dbConnection.isInitialized) {
    logger.fatal('Unable to connect to database, terminating application');
    process.exit(-1);
  }

  logger.info(`Database connection to ${appConfig.database.db} is running? ${dbConnection.isInitialized} `);

  const port = Number(appConfig.port) || 4030;
  const server = app.listen(port, () => {
    logger.info(`Server running on port ${port}`);
  });

  // Tune socket timeout
  server.keepAliveTimeout = 5 * 1000;
  server.headersTimeout = 10 * 1000;
})();

process.on('uncaughtException', (error) => {
  logger.fatal('FATAL: Unhandled exception, application will terminate in 1000ms...');
  logger.error(error);

  setTimeout(() => {
    process.exit(1);
  }, 1000);
});
