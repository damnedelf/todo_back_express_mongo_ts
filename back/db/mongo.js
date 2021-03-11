"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        .on("error", function (error) {
        console.log("error>>>>>>", error);
    });
};
module.exports = mongoConnect;
