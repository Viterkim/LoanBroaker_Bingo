"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rabbitmq_1 = require("./rabbitmq/rabbitmq");
var CPHBUSINESS_BANK_URL = "datdb.cphbusiness.dk:5672";
rabbitmq_1.getFromBank("bingoboisReply").then(function (result) {
});
