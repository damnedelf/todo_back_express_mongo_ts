"use strict";
exports.__esModule = true;
require("dotenv").config();
var mongoose = require("mongoose");
console.log("---------------");
console.log(process.env.MONGO_LOGIN);
console.log("---------------");
var mongoConnect = function () {
    var dbConnectUrl = "";
    if (process.env.MONGO_LOGIN && process.env.MONGO_PASS) {
        dbConnectUrl = "mongodb://" + process.env.MONGO_LOGIN + ":" + process.env.MONGO_PASS + "@localhost:27017/toDoCollection";
    }
    else {
        dbConnectUrl = "mongodb://localhost/toDoCollection";
    }
    mongoose.connect(dbConnectUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });
    mongoose.connection
        .once("open", function () {
        console.log("connection to db is up");
    })
        .on("error", function (error) {
        console.log("error>>>>>>", error);
    });
};
module.exports = mongoConnect;
