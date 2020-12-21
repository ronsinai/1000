const Axios = require('axios');
const Nconf = require('nconf');

Nconf.use('memory');
Nconf.argv().env().defaults({
  PORT: 1995,
  NODE_ENV: 'test',
  LOG_LEVEL: 'silent',
  MONGODB_URI: 'mongodb://localhost:27017',
  MONGODB_NAME: 'test_diagnostics',
});

const { clearDB } = require('./utils/db');
const Elef = require('../server');

before(async () => {
  this.elefInstance = new Elef();
  await this.elefInstance.start();
  Axios.defaults.baseURL = `http://localhost:${Nconf.get('PORT')}`;
});

beforeEach(async () => clearDB());

after(async () => {
  await this.elefInstance.stop();
});
