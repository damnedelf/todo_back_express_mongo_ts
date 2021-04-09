//connection to mongo

require('dotenv').config();
const mongoose2 = require('mongoose');

const mongoConnect = function () {
  let dbConnectUrl: string | undefined = process.env.MONGO_CONNECT_STRING;
  console.log(dbConnectUrl);
  if (!dbConnectUrl) {
    throw Error('Mongo str doesn`t exist');
  }

  mongoose2.connect(dbConnectUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
  mongoose2.connection
    .once('open', function () {
      console.log('connection to db is up');
    })
    .on('error', function (error: Error) {
      console.log('error>>>>>>', error);
    });
};
module.exports = mongoConnect;
