const Mongoose = require('mongoose');

const Models = require('../../server/models');

const clearDB = async () => {
  await Mongoose.connection.dropDatabase();
};

async function findDocument(collection, id) {
  return await Models[`${collection}Model`].findOne({ _id: id }).lean();
}

module.exports = {
  clearDB,
  findDocument,
};
