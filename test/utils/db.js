const { ObjectID } = require('mongodb');

const { getDB } = require('../../server/utils/db');

const clearDB = async () => {
  await getDB().dropDatabase();
};

async function findDocument(collection, id) {
  return await getDB().collection(collection).findOne({ _id: new ObjectID(id) });
}

module.exports = {
  clearDB,
  findDocument,
};
