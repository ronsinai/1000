const Express = require('express');
require('express-async-errors');
const Nconf = require('nconf');

const DB = require('./utils/db');
const { getLogger } = require('./utils/logger');
const Routes = require('./routes');

const logger = getLogger();

class App {
  async start() {
    try {
      await this._connectToDB();
      this._initApp();
    }
    catch (err) {
      logger.error(err);
      throw err;
    }
  }

  _initApp() {
    this.app = Express();
    this.app.use(Express.json());

    this.app.get('/', (req, res) => {
      res.status(200).send({
        status: true,
        response: 'App and Running!',
      });
    });

    this.app.use(Routes());

    this.app.use((err, req, res, next) => {
      const status = Object.getPrototypeOf(err).status || 500;
      res.status(status).send(err);
    });

    this.appInstance = this.app.listen(Nconf.get('PORT'), (err) => {
      if (err) throw err;
      logger.info(`1000 : server running on ${Nconf.get('PORT')}`);
    });
  }

  _stopApp() {
    this.appInstance.close();
  }

  // eslint-disable-next-line class-methods-use-this
  async _connectToDB() {
    await DB.connect(Nconf.get('MONGODB_URI'), Nconf.get('MONGODB_NAME'));
    logger.info(`1000 : connected to mongodb at ${Nconf.get('MONGODB_URI')}/${Nconf.get('MONGODB_NAME')}`);
  }

  // eslint-disable-next-line class-methods-use-this
  async _closeDBConnection() {
    await DB.close();
    logger.info(`1000 : disconnected from mongodb at ${Nconf.get('MONGODB_URI')}/${Nconf.get('MONGODB_NAME')}`);
  }

  async stop() {
    this._stopApp();
    await this._closeDBConnection();
    logger.info('1000 : server shutting down');
  }
}

module.exports = App;
