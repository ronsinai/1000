const Models = require('../../models');

class DBOperations {
  constructor(collection) {
    this.model = Models[`${collection}Model`];
  }

  async findOne(query) {
    return await this.model.findOne(query).lean();
  }

  async insertOne(filter, doc) {
    const options = {
      upsert: true,
      overwrite: true,
      returnOriginal: false,
    };

    return await this.model.findOneAndUpdate(filter, doc, options).lean();
  }

  async updateOne(filter, update) {
    const options = {
      upsert: false,
      returnOriginal: false,
    };

    return await this.model.findOneAndUpdate(filter, update, options).lean();
  }

  async deleteOne(filter) {
    return await this.model.findOneAndDelete(filter).lean();
  }
}

module.exports = DBOperations;
