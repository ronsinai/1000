const Mongoose = require('mongoose');

const USE_CREATE_INDEX = true;
const USE_FIND_ANF_MODIFY = false;
const USE_NEW_URL_PARSER = true;
const USE_UNIFIED_TOPOLOGY = true;

const connect = async (url, name) => {
  await Mongoose.connect(
    `${url}/${name}`,
    {
      useCreateIndex: USE_CREATE_INDEX,
      useFindAndModify: USE_FIND_ANF_MODIFY,
      useNewUrlParser: USE_NEW_URL_PARSER,
      useUnifiedTopology: USE_UNIFIED_TOPOLOGY,
    },
  );
};

const close = async () => {
  await Mongoose.connection.close();
};

module.exports = {
  connect,
  close,
};
