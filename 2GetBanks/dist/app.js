"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rabbitWorker_1 = require("./controllers/rabbitmq/rabbitWorker");
setInterval(function () {
    rabbitWorker_1.getFromRabbit('CreditService').then(function (result) {
        console.log(result);
    }).catch(function (err) {
        console.log(err);
    });
}, 100);
