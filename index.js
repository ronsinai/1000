const Nconf = require('nconf');
const Process = require('process');

Nconf.use('memory');
Nconf.argv().env().defaults({
  PORT: 1995,
  NODE_ENV: 'dev',
  MONGODB_URI: 'mongodb://localhost:27017',
  MONGODB_NAME: 'diagnostics',
});

const App = require('./server');

const appInstance = new App();
appInstance.shutdown = async () => {
  await appInstance.stop();
};

Process.on('SIGINT', appInstance.shutdown);
Process.on('SIGTERM', appInstance.shutdown);

(async () => {
  try {
    await appInstance.start();
  }
  catch (err) {
    await appInstance.stop();
  }
})();
