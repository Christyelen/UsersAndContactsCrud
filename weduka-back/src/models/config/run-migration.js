const { DataSource } = require('typeorm');

const { createLogger } = require('../../utils/createLogger');
const { config } = require('./index.js');

const logger = createLogger('migrations');

async function initializeDataSource() {
  const appDataSource = new DataSource(config);
  logger.info(`Initilizing datasource.`);
  await appDataSource.initialize();
  logger.info(`Data source initilized: ${appDataSource.isInitialized}`);
  return appDataSource;
}

initializeDataSource()
  .then((appDataSource) => {
    logger.info(`Running migrations`);
    appDataSource.runMigrations({ transaction: 'each' }).then(() => {
      logger.info(`Finished to run migrations`);
      process.exit(0);
    });
  })
  .catch((error) => {
    logger.error('Error initializing data source', error);
    process.exit(1);
  });
