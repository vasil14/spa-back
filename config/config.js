module.exports = {
  development: {
    username: 'vasil',
    password: 'test123',
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
    dialectOptions: {
      dateStrings: true,
      typeCast: true,
      timezone: 'local'
    }
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql'
  }
};
