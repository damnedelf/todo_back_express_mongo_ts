//connection to mongo
export {};
require("dotenv").config();
const mongoose = require("mongoose");

const mongoConnect = function () {
  let dbConnectUrl: string = "";

  if (process.env.MONGO_LOGIN && process.env.MONGO_PASS) {
    dbConnectUrl = `mongodb://${process.env.MONGO_LOGIN}:${process.env.MONGO_PASS}@localhost:${process.env.MONGO_PORT}/toDoCollection`;
  } else {
    dbConnectUrl = "mongodb://localhost/toDoCollection";
  }
  mongoose.connect(dbConnectUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
  mongoose.connection
    .once("open", function () {
      console.log("connection to db is up");
    })
    .on("error", function (error: Error) {
      console.log("error>>>>>>", error);
    });
};
module.exports = mongoConnect;
