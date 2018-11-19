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
function sendToBank(queueName, message) {
    return new Promise(function (resolve, reject) {
        amqp.connect("amqp://datdb.cphbusiness.dk:5672", function (err, conn) {
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
exports.sendToBank = sendToBank;
function getFromBank(queueName) {
    return new Promise(function (resolve, reject) {
        var connectURL = "amqp://datdb.cphbusiness.dk:5672";
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
                    console.log(message.content.toString('utf8'));
                    ch.ack(message);
                }, { noAck: false });
            });
        });
    });
}
exports.getFromBank = getFromBank;
