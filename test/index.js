const Axios = require('axios');
const Nconf = require('nconf');

Nconf.use('memory');
Nconf.argv().env().defaults({
  PORT: 1995,
  NODE_ENV: 'test',
});

const Elef = require('../server');

before(() => {
  this.elefInstance = new Elef();
  this.elefInstance.start();
  Axios.defaults.baseURL = `http://localhost:${Nconf.get('PORT')}`;
});

after(() => {
  this.elefInstance.stop();
});
