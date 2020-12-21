const { getDB } = require('.');

class DBOperations {
  constructor(collection) {
    this.collection = getDB().collection(collection);
  }

  // eslint-disable-next-line space-infix-ops
  async createIndex(index, options = {}) {
    this.collection.createIndex(index, options);
  }

  async findOne(query) {
    return await this.collection.findOne(query);
  }

  async insertOne(filter, doc) {
    const now = new Date();
    const copyDoc = { updatedAt: now, ...doc };

    const update = {
      $set: copyDoc,
      $setOnInsert: { createdAt: now },
    };
    const options = {
      upsert: true,
      returnOriginal: false,
    };

    return await this.collection.findOneAndUpdate(filter, update, options);
  }

  async updateOne(filter, doc) {
    const now = new Date();
    const copyDoc = { updatedAt: now, ...doc };

    const update = {
      $set: copyDoc,
      $setOnInsert: { createdAt: now },
    };
    const options = {
      upsert: false,
      returnOriginal: false,
    };

    return await this.collection.findOneAndUpdate(filter, update, options);
  }

  async deleteOne(filter) {
    return await this.collection.findOneAndDelete(filter);
  }
}

module.exports = DBOperations;
