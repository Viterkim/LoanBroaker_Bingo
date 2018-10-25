"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var amqp = require('amqplib/callback_api');
function getFromRabbit(queueName) {
    return new Promise(function (resolve, reject) {
        var connectURL = "amqp://hgounrgc:dP8MEKG-QdNujnTbDMaaaCQuRaouunIE@flamingo.rmq.cloudamqp.com/hgounrgc";
        var password = "dP8MEKG-QdNujnTbDMaaaCQuRaouunIE";
        amqp.connect(connectURL, function (err, conn) {
            if (err) {
                reject(err);
            }
            conn.createChannel(function (err, ch) {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                ch.assertQueue(queueName, { durable: false });
                ch.prefetch(1);
                console.log("Waiting for data from " + queueName);
                ch.consume(queueName, function (message) {
                    //TODO: Update rabbitMessage to actual object, content might be a buffer
                    resolve(message.content.toString('utf8'));
                    ch.ack(message);
                }, { noAck: false });
            });
        });
    });
}
exports.getFromRabbit = getFromRabbit;
