const Nconf = require('nconf');
const Process = require('process');

Nconf.use('memory');
Nconf.argv().env().defaults({
  PORT: 1995,
  NODE_ENV: 'dev',
});

const App = require('./server');

const appInstance = new App();
appInstance.shutdown = () => {
  appInstance.stop();
};

Process.on('SIGINT', appInstance.shutdown);
Process.on('SIGTERM', appInstance.shutdown);

try {
  appInstance.start();
}
catch (err) {
  appInstance.shutdown();
}
