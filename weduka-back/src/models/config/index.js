const appConfig = require('../../appConfig/index.js');
const mysql = require('mysql2');
const { DataSource } = require('typeorm');
const { SnakeNamingStrategy } = require('typeorm-naming-strategies');

let dataSource;

const config = {
  type: 'mysql',
  driver: mysql,
  connectorPackage: 'mysql2',
  replication: {
    master: {
      host: appConfig.database.host,
      port: Number(appConfig.database.port),
      username: appConfig.database.username,
      password: appConfig.database.password,
      database: appConfig.database.db,
    },
    slaves: [
      {
        host: appConfig.database.host,
        port: Number(appConfig.database.port),
        username: appConfig.database.username,
        password: appConfig.database.password,
        database: appConfig.database.db,
      },
    ],
  },
  synchronize: false,
  logging: ['error'],
  entities: [require('../entities/contacts.js'), require('../entities/user.js')],
  migrations: ['./src/models/migrations/*.js'],
  migrationsTableName: 'typeorm_migrations',
  namingStrategy: new SnakeNamingStrategy(),
  applicationName: 'weduka-backend',
};

const dbCreateConnection = async () => {
  try {
    dataSource = new DataSource(config);
    await dataSource.initialize();
    return dataSource;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const getManager = () => {
  return dataSource.manager;
};

module.exports = {
  config,
  dbCreateConnection,
  getManager,
};
