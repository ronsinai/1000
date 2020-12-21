const { getDB } = require('.');

class DBOperations {
  constructor(collection) {
    this.collection = getDB().collection(collection);
  }

  // eslint-disable-next-line space-infix-ops
  async createIndex(index, options={}) {
    this.collection.createIndex(index, options);
  }

  async findOne(query) {
    return await this.collection.findOne(query);
  }

  async upsert(filter, doc) {
    const update = {
      $set: doc,
      $setOnInsert: { createdAt: new Date() },
      $currentDate: { updatedAt: true },
    };
    const options = {
      upsert: true,
      returnOriginal: false,
    };

    return await this.collection.findOneAndUpdate(filter, update, options);
  }

  async deleteOne(filter) {
    return await this.collection.findOneAndDelete(filter);
  }
}

module.exports = DBOperations;
