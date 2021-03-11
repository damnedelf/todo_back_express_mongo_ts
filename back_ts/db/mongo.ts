//connection to mongo
export {};
const mongoose = require("mongoose");
const mongoConnect = function () {
  mongoose.connect("mongodb://localhost/toDoCollection", {
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
