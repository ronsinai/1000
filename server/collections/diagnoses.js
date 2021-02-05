const Joi = require('joi');

const DBOperations = require('../utils/db/operations');
const { diagnosisSchema } = require('../schemas');
const { getLogger } = require('../utils/logger');

const logger = getLogger();

class DiagnosesCollection {
  // eslint-disable-next-line space-infix-ops
  constructor(collection = 'diagnoses') {
    this.collection = new DBOperations(collection);
  }

  // eslint-disable-next-line class-methods-use-this
  _getFilter(document) {
    return (({ imagingId, diagnosis }) => ({ imagingId, diagnosis }))(document);
  }

  async insert(diagnosis) {
    try {
      Joi.assert(diagnosis, diagnosisSchema);
      const filter = this._getFilter(diagnosis);
      logger.info(`Inserting ${diagnosis.diagnosis} diagnosis of imaging ${diagnosis.imagingId} to database`);
      const insertedDocument = await this.collection.insertOne(filter, diagnosis);
      logger.info(`Inserted ${diagnosis.diagnosis} diagnosis of imaging ${diagnosis.imagingId} to database`);
      return insertedDocument;
    }
    catch (err) {
      logger.error(err);
      throw err;
    }
  }
}

module.exports = DiagnosesCollection;
