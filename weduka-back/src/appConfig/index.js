const appConfig = {
  port: 4000,
  baseTimeout: '5s',
  database: {
    port: 3306,
    host: process.env.DB_HOST || 'mysql',
    username: process.env.DB_USER || 'walter',
    password: process.env.DB_PASSWORD || 'white',
    db: process.env.DB_NAME || 'weduka_db',
  },
};

module.exports = appConfig;
