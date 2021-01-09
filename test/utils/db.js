const { getDB } = require('../../server/utils/db');

const clearDB = async () => {
  await getDB().dropDatabase();
};

async function findDocument(collection, id) {
  return await getDB().collection(collection).findOne({ _id: id });
}

module.exports = {
  clearDB,
  findDocument,
};
