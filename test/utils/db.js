const { getDB } = require('../../server/utils/db');

const clearDB = async () => {
  await getDB().dropDatabase();
};

module.exports = {
  clearDB,
};
