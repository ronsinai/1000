const Joi = require('joi');

const DBOperations = require('../utils/db/operations');
const { imagingSchema } = require('../schemas');
const { getLogger } = require('../utils/logger');

const logger = getLogger();

class ImagingsCollection {
  // eslint-disable-next-line space-infix-ops
  constructor(collection = 'imagings') {
    this.collection = new DBOperations(collection);
    this.collection.createIndex(collection, { type: 1, bodyPart: 1 });
  }

  // eslint-disable-next-line class-methods-use-this
  _getFilter(document) {
    return (({ _id }) => ({ _id }))(document);
  }

  async insert(imaging) {
    try {
      Joi.assert(imaging, imagingSchema);
      // eslint-disable-next-line object-curly-newline
      const { _id, type, bodyPart, metadata } = imaging;
      const { age, sex } = metadata;
      const filter = this._getFilter(imaging);
      logger.info(`Inserting ${bodyPart} ${type} imaging ${_id} of ${age}y ${sex} to database`);
      const result = await this.collection.upsert(filter, imaging);
      logger.info(`Inserted ${bodyPart} ${type} imaging ${_id} of ${age}y ${sex} to database`);
      const insertedDocument = result.value;
      return insertedDocument;
    }
    catch (err) {
      logger.error(err);
      throw err;
    }
  }

  async discharge(imagingId) {
    try {
      const filter = { _id: imagingId };
      const update = { discharged: true };
      logger.info(`Discharging patient with imaging ${imagingId} in database`);
      const result = await this.collection.update(filter, update);
      if (!result || !result.value) {
        throw new Error(`Could not discharge imaging ${imagingId}`);
      }
      logger.info(`Discharged patient with imaging ${imagingId} in database`);
      const insertedDocument = result.value;
      return insertedDocument;
    }
    catch (err) {
      logger.error(err);
      throw err;
    }
  }
}

module.exports = ImagingsCollection;
