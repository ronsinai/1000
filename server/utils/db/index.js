const Mongodb = require('mongodb');
const { promisify } = require('util');

const NEW_URL_PARSER = true;
const USE_UNIFIED_TOPOLOGY = true;

let connection;
let db;

const connect = async (url, name) => {
  if (!db) {
    // eslint-disable-next-line max-len
    connection = await promisify(Mongodb.connect)(url, { useNewUrlParser: NEW_URL_PARSER, useUnifiedTopology: USE_UNIFIED_TOPOLOGY });
    db = connection.db(name);
  }

  return db;
};

const close = async () => {
  await connection.close();
};

const getDB = () => db;

module.exports = {
  connect,
  close,
  getDB,
};
