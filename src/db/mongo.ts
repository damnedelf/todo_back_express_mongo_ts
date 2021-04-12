//connection to mongo

require('dotenv').config();
var mongoose = require('mongoose');

const mongoConnect = function () {
  let dbConnectUrl: string | undefined = process.env.MONGO_CONNECT_STRING;
  console.log(dbConnectUrl);
  if (!dbConnectUrl) {
    throw Error('Mongo str doesn`t exist');
  }

  mongoose.connect(dbConnectUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
  mongoose.connection
    .once('open', function () {
      console.log('connection to db is up');
    })
    .on('error', function (error: Error) {
      console.log('error>>>>>>', error);
    });
};
export default mongoConnect;
