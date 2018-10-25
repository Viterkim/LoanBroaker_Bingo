"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var amqp = require("amqplib/callback_api");
function sendToRabbit(message, queueName) {
    return new Promise(function (resolve, reject) {
        var connectURL = "amqp://hgounrgc:dP8MEKG-QdNujnTbDMaaaCQuRaouunIE@flamingo.rmq.cloudamqp.com/hgounrgc";
        var password = "dP8MEKG-QdNujnTbDMaaaCQuRaouunIE";
        amqp.connect(connectURL, function (err, conn) {
            if (err) {
                reject(err);
                return;
            }
            conn.createChannel(function (err, ch) {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                console.log("[rabbitPublisher.sendToRabbit] Sending to " + queueName + " the data: " + message);
                ch.assertQueue(queueName, { durable: false });
                ch.sendToQueue(queueName, Buffer.from(message));
                resolve(true);
            });
        });
    });
}
exports.sendToRabbit = sendToRabbit;
