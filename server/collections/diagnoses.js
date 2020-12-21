const Joi = require('joi');

const DBOperations = require('../utils/db/operations');
const { diagnosisSchema } = require('../schemas');

class DiagnosesCollection {
  // eslint-disable-next-line space-infix-ops
  constructor(collection='diagnoses') {
    this.collection = new DBOperations(collection);
    this.collection.createIndex(collection, { imagingId: 1, diagnosis: 1 }, { unique: true });
  }

  // eslint-disable-next-line class-methods-use-this
  _getFilter(document) {
    return (({ imagingId, diagnosis }) => ({ imagingId, diagnosis }))(document);
  }

  async insert(diagnosis) {
    try {
      Joi.assert(diagnosis, diagnosisSchema);
      const filter = this._getFilter(diagnosis);
      console.info(`Inserting ${diagnosis.diagnosis} diagnosis of imaging ${diagnosis.imagingId} to database`);
      const result = await this.collection.upsert(filter, diagnosis);
      console.info(`Inserted ${diagnosis.diagnosis} diagnosis of imaging ${diagnosis.imagingId} to database`);
      const insertedDocument = result.value;
      return insertedDocument;
    }
    catch (err) {
      console.error(err);
      throw err;
    }
  }
}

module.exports = DiagnosesCollection;
